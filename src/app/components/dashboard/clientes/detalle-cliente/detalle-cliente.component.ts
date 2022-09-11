import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {
  identificacion: string;
  loading = false;
  cliente: any = {};

  constructor(private clienteService: ClienteService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private location: Location,
    private router: Router) {
      this.identificacion = this.aRoute.snapshot.paramMap.get('identificacion');
  }
  ngOnInit(): void {
    this.getCliente();
  }

  getCliente(): void {
    this.loading = true;
    this.clienteService.getCliente(this.identificacion).subscribe(data => {
      this.loading = false;
      this.cliente = data;
      console.log(data);
    });
  }

  update(): void {

    this.loading = true;
    setTimeout(()=>{
      this.clienteService.modificarCliente(this.cliente).subscribe(data => {
        this.toastr.info(data.message);
        this.router.navigate(['/dashboard/gestionClientes']);
      }, error => {
        this.loading = false;
        this.toastr.error(error.error.message, 'Error!');
      });
    },3000);
  }
  activar(): void {
    this.cliente.estadoCliente = "ACTIVO"
    this.loading = true;
    setTimeout(()=>{
      this.clienteService.modificarCliente(this.cliente).subscribe(data => {      
        this.toastr.info(data.message);
        this.router.navigate(['/dashboard/gestionClientes']);
      }, error => {
        this.loading = false;
        this.toastr.error(error.error.message, 'Error!');
      });
    },3000);
  }
  
  inactivar(): void {
    this.cliente.estadoCliente = "INACTIVO"
    this.loading = true;
    setTimeout(()=>{
      this.clienteService.modificarCliente(this.cliente).subscribe(data => {      
        this.toastr.info(data.message);
        this.router.navigate(['/dashboard/gestionClientes']);
      }, error => {
        this.loading = false;
        this.toastr.error(error.error.message, 'Error!');
      });
    },3000);
  }


  goBack(): void {
    this.location.back;
  }
}
