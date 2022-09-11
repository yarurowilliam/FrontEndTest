import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Venta/';
  }

  guardarVenta(venta:Venta): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, venta);
  }

  getVenta(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  getListVentas(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListVentas');
  }

  traerGanancias(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + 'TraerGanancias');
  }

  getMejorCliente(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetMejorCliente');
  }


}
