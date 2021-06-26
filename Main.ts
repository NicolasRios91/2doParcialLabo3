const limpiarTabla = () => {
  let tCuerpo = document.getElementById("tCuerpo")!;
  tCuerpo.innerHTML = "";
};

const agregarVechiculo = (): void => {
  let arrayVehiculos: Array<Vehiculo> = JSON.parse(
    localStorage.getItem("vehiculos")!
  );
  if (!arrayVehiculos) {
    arrayVehiculos = [];
  }
  let id: number;
  if (arrayVehiculos.length == 0) {
    id = 1;
  } else {
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
    let auto: Auto = new Auto(
      id,
      marca,
      modelo,
      parseInt(precio),
      parseInt(puertas)
    );
    arrayVehiculos.push(auto);
  } else {
    if (tipo === "Camioneta") {
      let camioneta: Camioneta = new Camioneta(
        id,
        marca,
        modelo,
        parseInt(precio),
        esCamioneta
      );
      arrayVehiculos.push(camioneta);
    }
  }

  localStorage.setItem("vehiculos", JSON.stringify(arrayVehiculos));
};
const $ = (e: string) => {
  return <HTMLInputElement>document.getElementById(e);
};

const CrearFila = (e: Vehiculo) => {
  let tr = <HTMLTableRowElement>document.createElement("tr");
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
const mostrarVechiculos = (): void => {
  limpiarTabla();
  let arrayVehiculos: Array<Vehiculo> = JSON.parse(
    localStorage.getItem("vehiculos")!
  );
  let table = <HTMLElement>document.getElementById("tCuerpo");

  arrayVehiculos.forEach((e) => {
    let tr = CrearFila(e);
    table.appendChild(tr)!;
  });
};

const eliminarVechiculo = (e: Event): void => {
  let ar: Array<Vehiculo> = JSON.parse(localStorage.getItem("vehiculos")!);
  let path = e.target;
  let row = <HTMLTableRowElement>path;
  let data = row.parentNode?.parentNode;
  let id = <string>data?.childNodes[0].childNodes[0].nodeValue;
  let idNumber: number = parseInt(id, 0);
  let newAr: Array<Vehiculo> = ar.filter((e) => {
    if (e.id != idNumber) {
      return e;
    }
  });
  localStorage.setItem("vehiculos", JSON.stringify(newAr));
  mostrarVechiculos();
};

const filtrarPromedio = (): void => {
  let arrayVehiculos: Array<Vehiculo> = JSON.parse(
    localStorage.getItem("vehiculos")!
  );
  let arrayPrecio: Array<number> = arrayVehiculos.map((e) => e.precio);
  const suma: number = arrayPrecio.reduce((a, b) => a + b, 0);
  const promedio: number = suma / arrayPrecio.length;
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

const filtrarPorTipo = (): void => {
  limpiarTabla();
  let tipoAuto = $("filtroVehiculo").value;

  let table = <HTMLElement>document.getElementById("tCuerpo");
  let vehiculosFiltrados;
  let arrayVehiculos: Array<any>;
  if (tipoAuto === "Auto") {
    arrayVehiculos = JSON.parse(localStorage.getItem("vehiculos")!);
    vehiculosFiltrados = arrayVehiculos.filter(
      (item) => (<Auto>item).cantidadPuertas != null
    );
  } else {
    arrayVehiculos = JSON.parse(localStorage.getItem("vehiculos")!);
    vehiculosFiltrados = arrayVehiculos.filter(
      (item) => (<Camioneta>item).cuatroXcuatro != null
    );
  }
  vehiculosFiltrados.forEach((e) => {
    let tr = CrearFila(e);
    table.appendChild(tr)!;
  });
};
window.addEventListener("load", mostrarVechiculos);

window.addEventListener("load", () => {
  let btnAgregar = $("btnAgregar");
  btnAgregar.addEventListener("click", agregarVechiculo);
  let btnPromedio = $("CalcularPromedio");
  btnPromedio.addEventListener("click", filtrarPromedio);
  document
    .getElementById("filtroVehiculo")
    ?.addEventListener("change", filtrarPorTipo);
  let btnAlta = $("btnAlta");
  btnAlta.addEventListener("click", () => {
    let form = document.getElementById("contGrilla");
    console.log(form);
    form?.style.setProperty("visibility", "visible");
    let btnCerrar = document.getElementById("btnCerrar");
    btnCerrar?.addEventListener("click", () => {
      form?.style.setProperty("visibility", "hidden");
    });
  });
});
