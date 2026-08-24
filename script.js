const servicios = {
  // Reparaciones
  reparaciones: [
    { nombre: 'Reparación de motor', precio: 800 },
    { nombre: 'Cambio de neumáticos', precio: 300 },
    { nombre: 'Reparación de carrocería', precio: 450 },
    { nombre: 'Cambio de cristal/luna', precio: 250 }
  ],
  // Modificaciones
  modificaciones: [
    { nombre: 'Pintura personalizada', precio: 500 },
    { nombre: 'Aumento de rendimiento (Turbo)', precio: 2500 },
    { nombre: 'Kit de carrocería (Bodykit)', precio: 1800 },
    { nombre: 'Luces Neón / Tintado', precio: 600 }
  ],
  // Mantenimiento
  mantenimiento: [
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
  const btnAñadir = document.querySelectorAll('button')[0];
  const btnLimpiar = document.querySelectorAll('button')[1];

  function actualizarServicios() {
    // Convierte el valor a minúsculas para evitar fallos de coincidencia
    const val = (selectCategoria.value || '').toLowerCase().trim();
    
    // Busca la lista correspondiente o usa 'reparaciones' por defecto
    let lista = servicios[val];
    if (!lista) {
      const claves = Object.keys(servicios);
      lista = servicios[claves[selectCategoria.selectedIndex]] || servicios.reparaciones;
    }

    selectServicio.innerHTML = '';

    lista.forEach(s => {
      const option = document.createElement('option');
      option.value = s.nombre;
      option.dataset.precio = s.precio;
      option.textContent = `${s.nombre} - $${s.precio}`;
      selectServicio.appendChild(option);
    });
  }

  function renderizarPresupuesto() {
    let total = 0;
    presupuesto.forEach(item => {
      total += item.precio * item.cantidad;
    });

    const elementoTotal = Array.from(document.querySelectorAll('*')).find(
      el => el.textContent.includes('TOTAL') || el.textContent.includes('$')
    );
    
    if (elementoTotal) {
      elementoTotal.innerHTML = `TOTAL <strong>$${total}</strong>`;
    }
  }

  btnAñadir.addEventListener('click', (e) => {
    e.preventDefault();
    const optionSeleccionada = selectServicio.options[selectServicio.selectedIndex];
    if (!optionSeleccionada) return;

    const nombre = optionSeleccionada.value;
    const precio = parseFloat(optionSeleccionada.dataset.precio) || 0;
    const cantidad = parseInt(inputCantidad.value) || 1;

    presupuesto.push({ nombre, precio, cantidad });
    renderizarPresupuesto();
  });

  btnLimpiar.addEventListener('click', (e) => {
    e.preventDefault();
    presupuesto = [];
    renderizarPresupuesto();
  });

  selectCategoria.addEventListener('change', actualizarServicios);
  
  // Forzar carga inicial
  actualizarServicios();
});
