import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Articulo } from 'src/app/models/articulo';
import { DetalleVenta } from 'src/app/models/detalleVenta';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})
export class ListaArticulosComponent implements OnInit {
  datosDetalle: FormGroup;
  loading = false;
  ident : string;
  listArticulos: Articulo[] = [];
  searchText: string;
  articulo: Articulo;
  page = 1;
  pageSize = 6;

  @Output() enviarArticulo = new EventEmitter<DetalleVenta>();
  constructor( private articuloService: ArticuloService,private fb: FormBuilder, private toastr: ToastrService, private route: ActivatedRoute, private _router: Router) {
    this.datosDetalle = this.fb.group({
      cantidad: ['',Validators.required],
      searchText: ['']
    });
  
  }


  ngOnInit(): void {
    this.getArticulos();
  }
  getArticulos(): void {
    this.loading = true;
    this.articuloService.getListArticulosComprados().subscribe(data => {
      this.listArticulos = data;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error('No se pudo cargar la lista de productos', 'Error');
    });
  }

  getArticulo(referencia: string): void {
    this.loading = true;
    this.articuloService.getArticulo(referencia).subscribe(data => {
      this.loading = false;
      this.articulo = data;
      console.log(data);
    });
  }

  disminuirInventario(cantidad: number):void{
    this.loading = true;
    this.articulo.cantidad = this.articulo.cantidad - cantidad;
    this.articuloService.updateCantidad(this.articulo).subscribe(data => {
      this.toastr.info(data.message);
      this.getArticulos();
    }, error => {
      this.loading = false;
      this.toastr.error(error.error.message, 'Error!');
    });
  }

  agregarArticulo(referencia: string): void{
    
      try {
        this.getArticulo(referencia);
        this.searchText = referencia;
        const cantidad = this.datosDetalle.get('cantidad').value;
        if (cantidad<=0 || this.articulo.cantidad<cantidad){
          this.toastr.error('No puede llevar una cantidad menor a 0 o no hay disponibilidad', 'Error');
        }else{
          this.disminuirInventario(cantidad);
          const detalle: DetalleVenta = new DetalleVenta(this.articulo.referencia,this.articulo.nombre,cantidad,cantidad*this.articulo.precio);
          this.enviarArticulo.emit(detalle);
          this.datosDetalle.reset();
        }
      } catch (error) {
        this.toastr.success('¿Seguro que lo quiere agregar? Presiona agregar nuevamente', 'Aceptando datos...');
      }

  }
}
