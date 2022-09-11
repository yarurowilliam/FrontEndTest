import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
@Component({
  selector: 'app-detalles-ventas',
  templateUrl: './detalles-ventas.component.html',
  styleUrls: ['./detalles-ventas.component.css']
})
export class DetallesVentasComponent implements OnInit {
  idVenta: number;
  loading = false;
  venta: any = {};

  constructor(private ventaService: VentaService,
              private aRoute: ActivatedRoute) {
                this.idVenta = +this.aRoute.snapshot.paramMap.get('id');
    }
  ngOnInit(): void {
    this.getVenta();
  }

  getVenta(): void {
    this.loading = true;
    this.ventaService.getVenta(this.idVenta).subscribe(data => {
      this.loading = false;
      this.venta = data;
      console.log(data);
    });
  }
}
