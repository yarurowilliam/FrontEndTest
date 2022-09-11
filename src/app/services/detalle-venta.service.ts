import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetalleVenta } from '../models/detalleVenta';
@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {
  myAppUrl: string;
  myApiUrl: string;

  prueba : string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/DetalleVenta/';
  }

  getMejorProducto(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'ArticuloMasVendido');
  }

  
  getMenorProducto(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'ArticuloMenosVendido');
  }


}
