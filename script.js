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

let listaPresupuesto = [];

document.addEventListener('DOMContentLoaded', () => {
  const selectCat = document.getElementById('categoria');
  const selectServ = document.getElementById('servicio');
  const inputCant = document.getElementById('cantidad');
  const btnAdd = document.getElementById('btn-add');
  const btnClear = document.getElementById('btn-clear');
  const divLista = document.getElementById('lista-servicios');
  const spanTotal = document.getElementById('total-val');

  function cargarServicios() {
    const cat = selectCat.value;
    const items = servicios[cat] || [];
    selectServ.innerHTML = '';

    items.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.nombre;
      opt.textContent = `${s.nombre} - $${s.precio}`;
      opt.dataset.precio = s.precio;
      selectServ.appendChild(opt);
    });
  }

  function render() {
    divLista.innerHTML = '';
    let total = 0;

    if (listaPresupuesto.length === 0) {
      divLista.innerHTML = '<p class="vacio">No hay servicios añadidos.</p>';
      spanTotal.textContent = '$0';
      return;
    }

    listaPresupuesto.forEach(item => {
      const sub = item.precio * item.cantidad;
      total += sub;

      const row = document.createElement('div');
      row.className = 'item-linea';
      row.innerHTML = `<span>${item.cantidad}x ${item.nombre}</span><strong>$${sub}</strong>`;
      divLista.appendChild(row);
    });

    spanTotal.textContent = `$${total}`;
  }

  btnAdd.addEventListener('click', (e) => {
    e.preventDefault();
    const opt = selectServ.options[selectServ.selectedIndex];
    if (!opt) return;

    const nombre = opt.value;
    const precio = parseFloat(opt.dataset.precio);
    const cantidad = parseInt(inputCant.value) || 1;

    listaPresupuesto.push({ nombre, precio, cantidad });
    render();
  });

  btnClear.addEventListener('click', (e) => {
    e.preventDefault();
    listaPresupuesto = [];
    render();
  });

  selectCat.addEventListener('change', cargarServicios);
  cargarServicios();
});
