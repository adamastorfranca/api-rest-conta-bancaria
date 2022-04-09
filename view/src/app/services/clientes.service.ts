import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Cliente } from "src/app/models/cliente.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  api = environment.api;
  endpoint = 'clientes';
  cadastro = 'cadastrar';

  constructor(private http: HttpClient) {  }

  cadastrar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.api}/${this.endpoint}/${this.cadastro}/`, cliente);
  }
}
