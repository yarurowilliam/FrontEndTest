import { Injectable } from '@angular/core';
import { Articulo } from '../models/articulo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Articulo/';
  }

  saveArticulo(articulo: Articulo): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, articulo);
  }

  getListArticulos(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListArticulos');
  }

  getListArticulosComprados(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListArticulosComprados');
  }
  GetListArticulosConNombres(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListArticulosConNombres');
  }
  deleteArticulo(referencia: string): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + referencia);
  }

  getArticulo(referencia: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + referencia);
  }

  updateCantidad(articulo: Articulo): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + articulo.referencia, articulo);
  }

  traerTotalGastos(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + 'TraerTotalGastos');
  }

}
