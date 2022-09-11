import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Articulo } from 'src/app/models/articulo';
import { ArticuloService } from 'src/app/services/articulo.service';
@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  datosArticulos: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private router: Router,private articuloService: ArticuloService, private toastr: ToastrService) 
  { 
    this.datosArticulos = this.fb.group({
      referencia: ['', Validators.required],
      nombre: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      precio: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
  }

  registrarArticulo(): void{


    console.log(this.datosArticulos);

    const articulo: Articulo ={
      referencia: this.datosArticulos.value.referencia,
      nombre: this.datosArticulos.value.nombre,
      cantidad: this.datosArticulos.value.cantidad,
      precio: this.datosArticulos.value.precio
    };
    
    this.loading = true;
    setTimeout(()=>{
      this.articuloService.saveArticulo(articulo).subscribe(data => {
        console.log(data);
        this.toastr.success(data.message, 'Articulo Registrado!');
        this.router.navigate(['/dashboard/gestionarCompra']);
        this.loading = false;
      }, error => {
        this.loading = false;
        console.log(error);
        this.toastr.error(error.error.message, 'Error!');
        this.datosArticulos.reset();

      });
   },3000);
  }


}
