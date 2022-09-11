import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Cliente/';
  }

  guardarCliente(cliente: Cliente): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, cliente);
  }

  getListClientes(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListClientes');
  }

  getCliente(identificacion: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + identificacion);
  }

  modificarCliente(cliente: Cliente): Observable<any>{
    return this.http.put(this.myAppUrl+this.myApiUrl+cliente.identificacion,cliente);
  }
}
