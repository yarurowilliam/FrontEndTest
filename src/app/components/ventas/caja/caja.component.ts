import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloService } from 'src/app/services/articulo.service';
import { Articulo } from 'src/app/models/articulo';
import { DetalleVenta } from 'src/app/models/detalleVenta';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  datosVenta: FormGroup;
  loading = false;
  ident : string;
  client : Cliente;
  listArticulos: Articulo[];
  searchText: string;
  listDetalleVentas: DetalleVenta[] = [];
  articulo : Articulo;
  total: number;
  constructor( private ventaService: VentaService,private articuloService: ArticuloService,private fb: FormBuilder, private clienteService: ClienteService, private toastr: ToastrService, private route: ActivatedRoute, private _router: Router) 
    {
        this.datosVenta = this.fb.group({
          identificacion: ['', Validators.required],
          nombre: ['', Validators.required],
          searchText: ['']
        });
        this.prueba2 = false;
        this.total=0;

     }

  ngOnInit(): void {

  }

  actualizar(){
    this.listDetalleVentas.forEach(element=>{
      this.total = this.total + element.precio;
    });
  }

  get f() { return this.datosVenta.controls; }

  buscar() {
    this.clienteService.getCliente(this.datosVenta.value.identificacion).subscribe(cliente => {
      if (cliente != null) {
        this.f['nombre'].setValue(cliente.nombre+" "+cliente.apellido);
        this.toastr.success('El cliente ' + cliente.identificacion + ' fue encontrado!', 'Llenando campos...!');
      }else{
        this.toastr.error("El cliente no fue encontrado....", 'Redireccionando para registro!');
      }
    });
  }

  eliminarPregunta(index:number):void{
    this.prueba2 = true;
    var prueba = this.listDetalleVentas.slice(index,1);
    prueba.forEach(element => {
      this.prueba2 = false;
      if(this.pruebaRef == element.referencia){
        this.devolverInventario(this.pruebaCant);
        this.listDetalleVentas.splice(index,1); 
        this.total = this.total - element.precio;
      }else{
        this.toastr.error('Ese no fue el articulo que selecciono....', 'Error');
      }
      
    });
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

  guardarDetalle(detalleVenta:DetalleVenta):void{
    this.listDetalleVentas.push(detalleVenta);
    console.log(this.listDetalleVentas);
  }

  getArticulo(referencia: string): string {
    this.loading = true;
    this.articuloService.getArticulo(referencia).subscribe(data => {
      this.loading = false;
      this.articulo = data;
      console.log(data);
    });
    return this.articulo.referencia;
  }
  pruebaRef:string;
  pruebaCant:number;
  prueba2:boolean;
  select(referencia: string,cantidad : number):boolean{
    try {
      this.getArticulo(referencia);
      this.pruebaRef = referencia;
      this.pruebaCant = cantidad;
      return this.prueba2=true;
    } catch (error) {
      this.toastr.info('Confirme su seleccion','Confirmacion');
      return false;
    }

  }

  devolverInventario(cantidad:number):void{
    this.articulo.cantidad = this.articulo.cantidad + cantidad;
    this.articuloService.updateCantidad(this.articulo).subscribe(data => {
      this.toastr.info(data.message);
    }, error => {
      this.loading = false;
      this.toastr.error(error.error.message, 'Error!');
    });
  }
  
  guardarVenta():void{
    var total = 0;
    this.listDetalleVentas.forEach(element => {
      total = total + element.precio;
    });
    const venta: Venta = {
      totalPagar: total,
      estadoVenta: "VIGENTE",
      clienteId: this.datosVenta.value.identificacion,      
      listDetalleVentas: this.listDetalleVentas
    };
    this.loading = true;
    
    //Envio
    this.ventaService.guardarVenta(venta).subscribe(data =>{
      console.log(data);
      this.toastr.success('La  venta se registro exitosamente','Venta Registrada');
      this.datosVenta.reset();
      this.listDetalleVentas = [];
      this.total=0;
      this.loading = false;
    }, error => {
      this.toastr.error(error.error.message, 'Error!');
      this.datosVenta.reset();
      this.listDetalleVentas = [];
      this.loading = false;
    }
    )
  }

}
