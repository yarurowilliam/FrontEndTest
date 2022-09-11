import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  datosClientes: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private router: Router,private clienteService: ClienteService, private toastr: ToastrService) 
  { 
    this.datosClientes = this.fb.group({
      identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  
  ngOnInit(): void {
  }

  registrarCliente(): void{
    console.log(this.datosClientes);
    const cliente: Cliente ={
      identificacion: this.datosClientes.value.identificacion,
      nombre: this.datosClientes.value.nombre,
      apellido: this.datosClientes.value.apellido,
      direccion: this.datosClientes.value.direccion,
      telefono: this.datosClientes.value.telefono,
      email: this.datosClientes.value.email,
      estadoCliente: "ACTIVO",//this.datosClientes.value.estadoCliente
    };
    this.loading = true;
    setTimeout(()=>{
      this.clienteService.guardarCliente(cliente).subscribe(data => {
        console.log(data);
        this.toastr.success('El cliente ' + cliente.identificacion + ' fue registrado con exito!', 'Volviendo al modulo de ventas!');
        this.router.navigate(['/ventas']);
        this.loading = false;
      }, error => {
        this.loading = false;
        console.log(error);
        this.toastr.error(error.error.message, 'Error!');
        this.datosClientes.reset();
      });
   },3000);
  }
}
