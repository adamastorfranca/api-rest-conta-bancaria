import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ICliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  api = environment.api;
  endpoint = 'clientes';

  clientes: ICliente[] = [];

  constructor(
    private  http: HttpClient
  ) { }

  listarTodosClientes(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}/`);
  }

  cadastrar(cliente: ICliente) {
    return this.http.post(`${this.api}/${this.endpoint}/cadastrar`, cliente);
  }

  editar(cliente: ICliente) {
    return this.http.put(`${this.api}/${this.endpoint}/atualizar`, cliente);
  }

  remover(id: number) {
    return this.http.delete(`${this.api}/${this.endpoint}/${id}`);
  }

  buscarPorId(id: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${id}`);
  }

  buscarSemConta(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}/sem-conta`);
  }
}
