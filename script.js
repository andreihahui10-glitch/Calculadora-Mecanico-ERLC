const servicios = {
  reparaciones: [
    { nombre: 'Reparación de motor', precio: 800 },
    { nombre: 'Cambio de neumáticos', precio: 300 },
    { nombre: 'Reparación de carrocería', precio: 450 },
    { nombre: 'Cambio de cristal/luna', precio: 250 }
  ],
  modificaciones: [
    { nombre: 'Pintura personalizada', precio: 500 },
    { nombre: 'Aumento de rendimiento (Turbo)', precio: 2500 },
    { nombre: 'Kit de carrocería (Bodykit)', precio: 1800 },
    { nombre: 'Luces Neón / Tintado', precio: 600 }
  ],
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
    const val = (selectCategoria.value || '').toLowerCase().trim();
    
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

    // Busca un elemento span o p específico o el contenedor del total sin borrar el HTML
    const contenedorTotal = document.querySelector('.panel:last-child p') || 
                            document.querySelector('.panel:last-child h2') ||
                            document.querySelector('.panel:last-child');

    if (contenedorTotal) {
      // Si existe un elemento con el monto actual, actualizamos solo el número
      const spanPrecio = contenedorTotal.querySelector('span, strong');
      if (spanPrecio) {
        spanPrecio.textContent = `$${total}`;
      } else {
        // En caso de no tener etiquetas internas, actualiza el contenido directamente
        contenedorTotal.innerHTML = `TOTAL <strong>$${total}</strong>`;
      }
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
  actualizarServicios();
});
