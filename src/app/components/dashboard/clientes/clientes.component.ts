import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  listClientes: Cliente[] = [];
  loading = false;
  page = 1;
  pageSize = 6;
  estado = "ACTIVO";
  searchText: string;
  constructor(private clienteService: ClienteService,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getClientes();
    this.searchText = "";
  }

  

  getClientes(): void {
    this.loading = true;
    this.clienteService.getListClientes().subscribe(data => {
      this.listClientes = data;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error('Opss.. ocurrio un error', 'Error');
    });
  }

}
