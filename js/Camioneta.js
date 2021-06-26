"use strict";
class Camioneta extends Vehiculo {
    constructor(id, marca, modelo, precio, cuatroXcuatro) {
        super(id, marca, modelo, precio);
        this.cuatroXcuatro = cuatroXcuatro;
    }
}
