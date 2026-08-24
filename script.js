let carrito = [];

function agregarItem(nombre, precio) {
  const existe = carrito.find(item => item.nombre === nombre);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  actualizarUI();
}

function limpiarPresupuesto() {
  carrito = [];
  actualizarUI();
}

function actualizarUI() {
  const contenedor = document.getElementById('lista-presupuesto');
  const totalVal = document.getElementById('total-val');
  
  contenedor.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="vacio">Selecciona servicios para añadir al ticket...</p>';
    totalVal.textContent = '€0';
    return;
  }

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const row = document.createElement('div');
    row.className = 'linea-ticket';
    row.innerHTML = `
      <span>${item.cantidad}x ${item.nombre} (€${item.precio})</span>
      <strong>€${subtotal}</strong>
    `;
    contenedor.appendChild(row);
  });

  totalVal.textContent = `€${total}`;
}
