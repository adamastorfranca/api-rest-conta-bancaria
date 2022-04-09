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
  login = 'auth'

  constructor(private http: HttpClient) { }

  logar(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(`${this.api}/${this.login}/`, conta);
  }
}
