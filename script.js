// ==============================
// PRECIOS DEL MECÁNICO
// ==============================

const precios = {
    reparacion: 0,
    pintura: 0,
    neumaticos: 0,
    otros: 0
};


// ==============================
// CALCULAR TOTAL
// ==============================

function calcular() {

    const reparacion = Number(document.getElementById("reparacion").value);
    const pintura = Number(document.getElementById("pintura").value);
    const neumaticos = Number(document.getElementById("neumaticos").value);
    const otros = Number(document.getElementById("otros").value);

    const total =
        (reparacion * precios.reparacion) +
        (pintura * precios.pintura) +
        (neumaticos * precios.neumaticos) +
        (otros * precios.otros);

    document.getElementById("total").textContent = "$" + total.toLocaleString();
}
