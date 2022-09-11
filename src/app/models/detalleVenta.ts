export class DetalleVenta{
    referencia : string;
    nombre : string;
    cantidad : number;
    precio : number;
    ventaId ?: number;

    constructor(referencia: string, nombre: string, cantidad:number,precio:number){
        this.referencia = referencia;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}