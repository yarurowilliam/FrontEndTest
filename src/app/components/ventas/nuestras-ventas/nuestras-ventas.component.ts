import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-nuestras-ventas',
  templateUrl: './nuestras-ventas.component.html',
  styleUrls: ['./nuestras-ventas.component.css']
})
export class NuestrasVentasComponent implements OnInit {
  listaVentas: Venta[] = [];
  loading = false;
  searchText: string;
  page = 1;
  pageSize = 6;
  estado = "VIGENTE";

  constructor(private ventaService: VentaService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCuestionarios();
  }

  getCuestionarios(): void {
    this.loading = true;
    this.ventaService.getListVentas().subscribe(data => {
      this.listaVentas = data;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error('Opss.. ocurrio un error', 'Error');
    });
  }
}
