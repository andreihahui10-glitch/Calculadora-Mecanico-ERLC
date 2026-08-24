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
  const selectCategoria = document.getElementById('select-categoria');
  const selectServicio = document.getElementById('select-servicio');
  const inputCantidad = document.getElementById('input-cantidad');
  const formServicio = document.getElementById('form-servicio');
  const listaPresupuesto = document.getElementById('lista-presupuesto');
  const totalMonto = document.getElementById('total-monto');
  const btnLimpiar = document.getElementById('btn-limpiar');

  function actualizarServicios() {
    const cat = selectCategoria.value;
    const lista = servicios[cat] || [];
    selectServicio.innerHTML = '';

    lista.forEach(s => {
      const option = document.createElement('option');
      option.value = s.nombre;
      option.textContent = `${s.nombre} ($${s.precio})`;
      option.dataset.precio = s.precio;
      selectServicio.appendChild(option);
    });
  }

  function renderizarPresupuesto() {
    listaPresupuesto.innerHTML = '';
    let total = 0;

    if (presupuesto.length === 0) {
      listaPresupuesto.innerHTML = '<p class="vacio">No hay servicios añadidos aún.</p>';
      totalMonto.textContent = '$0';
      return;
    }

    presupuesto.forEach((item) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      const div = document.createElement('div');
      div.className = 'item-row';
      div.innerHTML = `
        <span>${item.cantidad}x ${item.nombre}</span>
        <strong>$${subtotal}</strong>
      `;
      listaPresupuesto.appendChild(div);
    });

    totalMonto.textContent = `$${total}`;
  }

  formServicio.addEventListener('submit', (e) => {
    e.preventDefault();
    const optionSelected = selectServicio.options[selectServicio.selectedIndex];
    if (!optionSelected) return;

    const nombre = optionSelected.value;
    const precio = parseFloat(optionSelected.dataset.precio);
    const cantidad = parseInt(inputCantidad.value) || 1;

    presupuesto.push({ nombre, precio, cantidad });
    renderizarPresupuesto();
  });

  btnLimpiar.addEventListener('click', () => {
    presupuesto = [];
    renderizarPresupuesto();
  });

  selectCategoria.addEventListener('change', actualizarServicios);
  actualizarServicios();
});
