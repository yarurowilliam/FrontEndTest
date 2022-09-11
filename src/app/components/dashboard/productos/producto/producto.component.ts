import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticuloService } from 'src/app/services/articulo.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  referencia: string;
  loading = false;
  articulo: any = {};

  constructor(private articuloService: ArticuloService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private location: Location,
    private router: Router) {
      this.referencia = this.aRoute.snapshot.paramMap.get('referencia');
  }
  ngOnInit(): void {
    this.getProveedor();
  }

  getProveedor(): void {
    this.loading = true;
    this.articuloService.getArticulo(this.referencia).subscribe(data => {
      this.loading = false;
      this.articulo = data;
      console.log(data);
    });
  }

  update(): void {

    this.loading = true;
    setTimeout(()=>{
      this.articuloService.updateCantidad(this.articulo).subscribe(data => {
        this.toastr.info(data.message);
        this.router.navigate(['/dashboard']);
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
