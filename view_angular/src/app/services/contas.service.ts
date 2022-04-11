import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDepositoSaque } from '../interfaces/deposito-saque';

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  api = environment.api;
  endpoint = 'contas';

  constructor(private httpClient: HttpClient) { }

  depositar(deposito: IDepositoSaque) {
    return this.httpClient.put(`${this.api}/${this.endpoint}/deposito`, deposito);
  }
}
