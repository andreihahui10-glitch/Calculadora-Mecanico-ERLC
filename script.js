// Servicios y precios realistas para ER:LC
const servicios = {
  Reparaciones: [
    { nombre: 'Reparación de motor', precio: 800 },
    { nombre: 'Cambio de neumáticos', precio: 300 },
    { nombre: 'Reparación de carrocería', precio: 450 },
    { nombre: 'Cambio de cristal/luna', precio: 250 }
  ],
  Modificaciones: [
    { nombre: 'Pintura personalizada', precio: 500 },
    { nombre: 'Aumento de rendimiento (Turbo)', precio: 2500 },
    { nombre: 'Kit de carrocería (Bodykit)', precio: 1800 },
    { nombre: 'Luces Neón / Tintado de cristales', precio: 600 }
  ],
  Mantenimiento: [
    { nombre: 'Cambio de aceite', precio: 150 },
    { nombre: 'Revisión y frenos', precio: 350 },
    { nombre: 'Recarga de nitrógeno / Nitro', precio: 1000 }
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
    
    // Asocia por clave o por índice si el HTML usa nombres distintos
    const opcionesCategoria = Object.keys(servicios);
    const categoriaSeleccionada = servicios[cat] ? cat : opcionesCategoria[selectCategoria.selectedIndex] || 'Reparaciones';
    
    if (servicios[categoriaSeleccionada]) {
      servicios[categoriaSeleccionada].forEach(s => {
        const option = document.createElement('option');
        option.value = s.nombre;
        option.textContent = `${s.nombre} (€${s.precio})`;
        selectServicio.appendChild(option);
      });
    }
  }

  function renderizarPresupuesto() {
    let total = 0;
    presupuesto.forEach(item => {
      total += item.precio * item.cantidad;
    });

    const elementoTotal = Array.from(document.querySelectorAll('*')).find(el => el.textContent.includes('TOTAL') || el.textContent.includes('$'));
    if (elementoTotal) {
      elementoTotal.innerHTML = `TOTAL <strong>€${total}</strong>`;
    }
  }

  btnAñadir.addEventListener('click', (e) => {
    e.preventDefault();
    const catIndex = selectCategoria.selectedIndex;
    const catNombre = Object.keys(servicios)[catIndex] || selectCategoria.value;
    const nombreServicio = selectServicio.value;
    const cantidad = parseInt(inputCantidad.value) || 1;

    const listaActual = servicios[catNombre] || servicios[selectCategoria.value];
    const servicioEncontrado = listaActual?.find(s => s.nombre === nombreServicio);
    
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
