import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Articulo } from 'src/app/models/articulo';
import { ArticuloService } from 'src/app/services/articulo.service';
@Component({
  selector: 'app-gestionar-compra',
  templateUrl: './gestionar-compra.component.html',
  styleUrls: ['./gestionar-compra.component.css']
})
export class GestionarCompraComponent implements OnInit {

  listArticulos: Articulo[] = [];
  loading = false;
  nombreUsuario: string;
  page = 1;
  pageSize = 6;
  estado = "COMPRADO";
  searchText: string;

  constructor(
    private articuloService: ArticuloService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getArticulos();
    this.searchText = "";
  }

  getArticulos(): void {
    this.loading = true;
    this.articuloService.GetListArticulosConNombres().subscribe(data => {
      this.listArticulos = data;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error('Opss.. ocurrio un error', 'Error');
    });
  }

  anuncio(): void{
    this.toastr.info('Ventas en construccion', 'ESTAMOS TRABAJANDO!');
  }

}
