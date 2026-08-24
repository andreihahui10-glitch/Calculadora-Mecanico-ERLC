const servicios = {
  Reparaciones: [
    { nombre: 'Reparación de motor', precio: 500 },
    { nombre: 'Cambio de ruedas', precio: 200 },
    { nombre: 'Reparación de carrocería', precio: 350 }
  ],
  Modificaciones: [
    { nombre: 'Pintura personalizada', precio: 600 },
    { nombre: 'Aumento de velocidad (Turbo)', precio: 1200 },
    { nombre: 'Luces Neón', precio: 400 }
  ],
  Mantenimiento: [
    { nombre: 'Cambio de aceite', precio: 150 },
    { nombre: 'Revisión general', precio: 250 }
  ]
};

let presupuesto = [];

document.addEventListener('DOMContentLoaded', () => {
  const selectCategoria = document.querySelectorAll('select')[0];
  const selectServicio = document.querySelectorAll('select')[1];
  const inputCantidad = document.querySelector('input[type="number"]');
  const btnAñadir = document.querySelector('button');
  const btnLimpiar = document.querySelectorAll('button')[1];

  function actualizarServicios() {
    const cat = selectCategoria.value;
    selectServicio.innerHTML = '';
    
    if (servicios[cat]) {
      servicios[cat].forEach(s => {
        const option = document.createElement('option');
        option.value = s.nombre;
        option.textContent = `${s.nombre} ($${s.precio})`;
        selectServicio.appendChild(option);
      });
    }
  }

  function renderizarPresupuesto() {
    const totalElemento = document.querySelector('.panel:nth-child(2) h2') || document.body;
    let total = 0;

    presupuesto.forEach(item => {
      total += item.precio * item.cantidad;
    });

    // Actualiza el texto del total en pantalla
    const elementoTotal = Array.from(document.querySelectorAll('*')).find(el => el.textContent.includes('TOTAL'));
    if (elementoTotal) {
      elementoTotal.innerHTML = `TOTAL <strong>$${total}</strong>`;
    }
  }

  btnAñadir.addEventListener('click', (e) => {
    e.preventDefault();
    const cat = selectCategoria.value;
    const nombreServicio = selectServicio.value;
    const cantidad = parseInt(inputCantidad.value) || 1;

    const servicioEncontrado = servicios[cat]?.find(s => s.nombre === nombreServicio);
    
    if (servicioEncontrado) {
      presupuesto.push({
        nombre: servicioEncontrado.nombre,
        precio: servicioEncontrado.precio,
        cantidad: cantidad
      });
      renderizarPresupuesto();
    }
  });

  btnLimpiar.addEventListener('click', (e) => {
    e.preventDefault();
    presupuesto = [];
    renderizarPresupuesto();
  });

  selectCategoria.addEventListener('change', actualizarServicios);
  actualizarServicios();
});
