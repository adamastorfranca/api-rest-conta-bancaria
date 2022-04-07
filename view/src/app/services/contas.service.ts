import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Conta } from "../models/conta.model";

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  api = environment.api;
  endpoint = 'contas';

  constructor(private http: HttpClient) { }

  listarTodasContas(): Observable<Conta[]>{
    return this.http.get<Conta[]>(`${this.api}/${this.endpoint}/`);
  }
}
