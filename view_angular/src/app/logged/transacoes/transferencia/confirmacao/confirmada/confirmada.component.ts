import { Component, OnInit } from '@angular/core';
import { IContaLogada } from 'src/app/interfaces/conta-logada';

import { IContaTemp } from 'src/app/interfaces/conta-temp';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-confirmada',
  templateUrl: './confirmada.component.html',
  styleUrls: ['./confirmada.component.css']
})
export class ConfirmadaComponent implements OnInit {

  data: Date = new Date();
  tranferenciaConfirmada: IContaTemp = {
    nomeCliente: '',
    agencia: '',
    numero: '',
    valor: 0
  }

  contaConectada: IContaLogada = {
    id: 0,
    agencia: '',
    numero: '',
    saldo: 0,
    idCliente: 0,
    nomeCliente: '',
    cpf: ''
  }

  constructor(
    private contaService: ContasService,
    private authService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.tranferenciaConfirmada = this.contaService.temp;
    this.contaConectada = this.authService.contaConectada;
  }

}
