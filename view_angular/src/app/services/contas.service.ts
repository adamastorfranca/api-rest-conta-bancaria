import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICadastro } from '../interfaces/cadastro';
import { IDepositoSaque } from '../interfaces/deposito-saque';

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  api = environment.api;
  endpoint = 'contas';

  constructor(private http: HttpClient) { }

  cadastrar(conta: ICadastro): Observable<ICadastro> {
    return this.http.post<ICadastro>(`${this.api}/${this.endpoint}/cadastrar`, conta);
  }

  depositar(deposito: IDepositoSaque) {
    return this.http.put(`${this.api}/${this.endpoint}/deposito`, deposito);
  }
}
