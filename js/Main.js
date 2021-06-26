"use strict";
const limpiarTabla = () => {
    let tCuerpo = document.getElementById("tCuerpo");
    tCuerpo.innerHTML = "";
};
const agregarVechiculo = () => {
    let arrayVehiculos = JSON.parse(localStorage.getItem("vehiculos"));
    if (!arrayVehiculos) {
        arrayVehiculos = [];
    }
    let id;
    if (arrayVehiculos.length == 0) {
        id = 1;
    }
    else {
        let auxVehiculos = arrayVehiculos;
        id = auxVehiculos.reduce(function (max, item) {
            if (item.id >= max) {
                return item.id + 1;
            }
            return max;
        }, 0);
        if (id == 0) {
            id + 1;
        }
    }
    let marca = $("marcaVehiculo").value;
    let modelo = $("modeloVehiculo").value;
    let precio = $("precioVehiculo").value;
    let tipo = $("vehiculos").value;
    let puertas = $("cantidadPuertas").value;
    let tipoCamioneta = $("tipoCamioneta").value;
    let esCamioneta = false;
    if (tipoCamioneta === "4x4") {
        esCamioneta = true;
    }
    if (tipo === "Auto") {
        let auto = new Auto(id, marca, modelo, parseInt(precio), parseInt(puertas));
        arrayVehiculos.push(auto);
    }
    else {
        if (tipo === "Camioneta") {
            let camioneta = new Camioneta(id, marca, modelo, parseInt(precio), esCamioneta);
            arrayVehiculos.push(camioneta);
        }
    }
    localStorage.setItem("vehiculos", JSON.stringify(arrayVehiculos));
};
const $ = (e) => {
    return document.getElementById(e);
};
const CrearFila = (e) => {
    let tr = document.createElement("tr");
    let tdmarca = document.createElement("td");
    let tdmodelo = document.createElement("td");
    let tdprecio = document.createElement("td");
    let tdId = document.createElement("td");
    let marca = document.createTextNode(e.marca);
    let modelo = document.createTextNode(e.modelo);
    let precio = document.createTextNode(e.precio.toString());
    let id = document.createTextNode(e.id.toString());
    let tdBorrar = document.createElement("td");
    let linkBorrar = document.createElement("a");
    let borrar = document.createTextNode("borrar");
    linkBorrar.addEventListener("click", eliminarVechiculo);
    linkBorrar.appendChild(borrar);
    tdBorrar.appendChild(linkBorrar);
    tdmarca.appendChild(marca);
    tdmodelo.appendChild(modelo);
    tdprecio.appendChild(precio);
    tdId.appendChild(id);
    tr.appendChild(tdId);
    tr.appendChild(tdmarca);
    tr.appendChild(tdmodelo);
    tr.appendChild(tdprecio);
    tr.appendChild(tdBorrar);
    return tr;
};
const mostrarVechiculos = () => {
    limpiarTabla();
    let arrayVehiculos = JSON.parse(localStorage.getItem("vehiculos"));
    let table = document.getElementById("tCuerpo");
    arrayVehiculos.forEach((e) => {
        let tr = CrearFila(e);
        table.appendChild(tr);
    });
};
const eliminarVechiculo = (e) => {
    var _a;
    let ar = JSON.parse(localStorage.getItem("vehiculos"));
    let path = e.target;
    let row = path;
    let data = (_a = row.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;
    let id = data === null || data === void 0 ? void 0 : data.childNodes[0].childNodes[0].nodeValue;
    let idNumber = parseInt(id, 0);
    let newAr = ar.filter((e) => {
        if (e.id != idNumber) {
            return e;
        }
    });
    localStorage.setItem("vehiculos", JSON.stringify(newAr));
    mostrarVechiculos();
};
const filtrarPromedio = () => {
    let arrayVehiculos = JSON.parse(localStorage.getItem("vehiculos"));
    let arrayPrecio = arrayVehiculos.map((e) => e.precio);
    const suma = arrayPrecio.reduce((a, b) => a + b, 0);
    const promedio = suma / arrayPrecio.length;
    $("PromedioPrecio").value = promedio.toString();
};
// const filtrarPromedio = () => {
//   myPromise.then((value: any) => {
//     $("PromedioPrecio").value = value;
//   });
// };
// const myPromise = new Promise(function (myResolve, myReject) {
//   let arrayVehiculos: Array<Vehiculo> = JSON.parse(
//     localStorage.getItem("vehiculos")!
//   );
//   setTimeout(() => {
//     let myPromise = new Promise(function (myResolve, myReject) {
//       setTimeout(() => {
//         let arrayPrecio: Array<number> = arrayVehiculos.map((e) => e.precio);
//         const suma: number = arrayPrecio.reduce((a, b) => a + b, 0);
//         const promedio: number = suma / arrayPrecio.length;
//         myResolve(promedio);
//       });
//     });
//   });
// });
const filtrarPorTipo = () => {
    limpiarTabla();
    let tipoAuto = $("filtroVehiculo").value;
    let table = document.getElementById("tCuerpo");
    let vehiculosFiltrados;
    let arrayVehiculos;
    if (tipoAuto === "Auto") {
        arrayVehiculos = JSON.parse(localStorage.getItem("vehiculos"));
        vehiculosFiltrados = arrayVehiculos.filter((item) => item.cantidadPuertas != null);
    }
    else {
        arrayVehiculos = JSON.parse(localStorage.getItem("vehiculos"));
        vehiculosFiltrados = arrayVehiculos.filter((item) => item.cuatroXcuatro != null);
    }
    vehiculosFiltrados.forEach((e) => {
        let tr = CrearFila(e);
        table.appendChild(tr);
    });
};
window.addEventListener("load", mostrarVechiculos);
window.addEventListener("load", () => {
    var _a;
    let btnAgregar = $("btnAgregar");
    btnAgregar.addEventListener("click", agregarVechiculo);
    let btnPromedio = $("CalcularPromedio");
    btnPromedio.addEventListener("click", filtrarPromedio);
    (_a = document
        .getElementById("filtroVehiculo")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", filtrarPorTipo);
    let btnAlta = $("btnAlta");
    btnAlta.addEventListener("click", () => {
        let form = document.getElementById("contGrilla");
        form === null || form === void 0 ? void 0 : form.style.setProperty("visibility", "visible");
    });
});
