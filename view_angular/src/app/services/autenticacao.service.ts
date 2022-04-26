import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable} from 'rxjs';
import { ILogin } from '../interfaces/login';
import { IConta } from '../interfaces/conta';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  api = environment.api;
  private endpoint = 'auth';

  contaConectada: IConta = {
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

  salvarInformacoes(conta :IConta): IConta {
    this.contaConectada.id = conta.id.valueOf();
    this.contaConectada.agencia = conta.agencia.valueOf();
    this.contaConectada.numero = conta.numero.valueOf();
    this.contaConectada.saldo = conta.saldo.valueOf();
    this.contaConectada.idCliente = conta.idCliente.valueOf();
    this.contaConectada.nomeCliente = conta.nomeCliente.valueOf();
    this.contaConectada.cpf = conta.cpf.valueOf();
    return this.contaConectada;
  }
}

