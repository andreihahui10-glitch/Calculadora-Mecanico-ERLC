// Precios y servicios para ER:LC
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

let listaPresupuesto = [];

document.addEventListener('DOMContentLoaded', () => {
  const selectCategoria = document.querySelectorAll('select')[0];
  const selectServicio = document.querySelectorAll('select')[1];
  const inputCantidad = document.querySelector('input[type="number"]');
  const btnAñadir = document.querySelector('button');
  const btnLimpiar = document.querySelectorAll('button')[1];

  // Cargar servicios según la categoría seleccionada
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

  selectCategoria.addEventListener('change', actualizarServicios);
  actualizarServicios(); // Carga inicial
});
