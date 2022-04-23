import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  api = environment.api;
  endpoint = 'auth';

  constructor(
    private httpClient: HttpClient
  ) { }

  autenticar(agencia: string, numeroConta: string, senha: string): Observable<any> {
    return this.httpClient.post(`${this.api}/${this.endpoint}/`, {
      agencia: agencia,
      numeroConta: numeroConta,
      senha: senha,
    });
  }

}

