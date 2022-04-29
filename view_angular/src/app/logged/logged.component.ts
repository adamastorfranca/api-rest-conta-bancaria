import { Component, OnInit } from '@angular/core';
import { IContaLogada } from '../interfaces/conta-logada';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {

  contaConectada: IContaLogada = {
    id: 0,
    agencia: '',
    numero: '',
    saldo: 0,
    idCliente: 0,
    nomeCliente: '',
    cpf: ''
  }

  mostrarSaldo: boolean = true;

  constructor(private authService: AutenticacaoService) { }

  ngOnInit(): void {
    this.contaConectada = this.authService.contaConectada;
  }

}
