import { DetalleVenta } from "./detalleVenta";

export class Venta{
    id?: number; 
    fecha?: Date;
    totalPagar: number; 
    estadoVenta?: string;
    clienteId?: string; 
    usuarioId?: number;
    listDetalleVentas: DetalleVenta[];

    constructor(fecha: Date, totalPagar: number,estadoVenta:string,clienteId: string, usuarioId: number, listDetalleVentas:DetalleVenta[]){
        this.fecha = fecha;
        this.totalPagar = totalPagar;
        this.estadoVenta = estadoVenta;
        this.clienteId = clienteId;
        this.usuarioId = usuarioId;
        this.listDetalleVentas = listDetalleVentas;
    }

}