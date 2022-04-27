import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable} from 'rxjs';
import { ILogin } from '../interfaces/login';
import { IContaLogada } from '../interfaces/conta-logada';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  api = environment.api;
  private endpoint = 'auth';

  contaConectada: IContaLogada = {
    id: 0,
    agencia: '',
    numero: '',
    saldo: 0,
    idCliente: 0,
    nomeCliente: '',
    cpf: ''
  }

  constructor( private httpClient: HttpClient ) {  }

  autenticar(login: ILogin): Observable<ILogin> {
    return this.httpClient.post<ILogin>(`${this.api}/${this.endpoint}/`, login);
  }

  salvarInformacoes(conta :IContaLogada): IContaLogada {
    this.contaConectada.id = conta.id;
    this.contaConectada.agencia = conta.agencia;
    this.contaConectada.numero = conta.numero;
    this.contaConectada.saldo = conta.saldo;
    this.contaConectada.idCliente = conta.idCliente;
    this.contaConectada.nomeCliente = conta.nomeCliente;
    this.contaConectada.cpf = conta.cpf;
    return this.contaConectada;
  }
}

