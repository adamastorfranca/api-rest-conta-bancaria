import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IContaTemp } from '../interfaces/contaTemp';
import { ICadastro } from '../interfaces/cadastro';
import { IConta } from '../interfaces/conta';
import { IDepositoSaque } from '../interfaces/deposito-saque';

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  api = environment.api;
  endpoint = 'contas';

  temp: IContaTemp = {
    nomeCliente: '',
    agencia: '',
    numero: '',
    valor: 0
  }

  constructor(private http: HttpClient) { }

  cadastrar(conta: ICadastro): Observable<ICadastro> {
    return this.http.post<ICadastro>(`${this.api}/${this.endpoint}/cadastrar`, conta);
  }

  buscarInformacoes(agencia: string, numero: string): Observable<IConta> {
    return this.http.get<IConta>(`${this.api}/${this.endpoint}/informacoes/${agencia}/${numero}/`);
  }

  depositar(deposito: IDepositoSaque) {
    return this.http.put(`${this.api}/${this.endpoint}/deposito`, deposito);
  }

  salvarInformacoes(cadastro:ICadastro): IContaTemp{
    this.temp.nomeCliente = cadastro.nomeCliente.valueOf();
    this.temp.agencia = cadastro.agencia.valueOf();
    this.temp.numero = cadastro.numero.valueOf();
    return this.temp;
  }
}
