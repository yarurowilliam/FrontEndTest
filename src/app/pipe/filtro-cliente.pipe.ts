import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
@Pipe({
  name: 'filtroCliente'
})
export class FiltroClientePipe implements PipeTransform {

  transform(clientes: Cliente[], searchText: string) {
    if (searchText == null) return clientes;
    return clientes.filter(cliente =>
      cliente.identificacion.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      cliente.nombre.toLowerCase().indexOf(searchText.toLowerCase())  !== -1 ||
      cliente.apellido.toLowerCase().indexOf(searchText.toLowerCase())  !== -1 ||
      cliente.telefono.toLowerCase().indexOf(searchText.toLowerCase())  !== -1 ||
      cliente.email.toLowerCase().indexOf(searchText.toLowerCase())  !== -1 ||
      cliente.estadoCliente.toLowerCase().indexOf(searchText.toLowerCase())  !== -1 
    );
  }

}
