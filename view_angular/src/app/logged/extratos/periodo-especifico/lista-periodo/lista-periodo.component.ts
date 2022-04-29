import { Component, OnInit } from '@angular/core';

import { IExtrato } from 'src/app/interfaces/extrato';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ExtratosService } from 'src/app/services/extratos.service';

@Component({
  selector: 'app-lista-periodo',
  templateUrl: './lista-periodo.component.html',
  styleUrls: ['./lista-periodo.component.css']
})
export class ListaPeriodoComponent implements OnInit {

  agencia: string = '';
  numeroConta: string = '';
  dataInicio: string = '';
  dataFinal: string = '';

  transacoes: IExtrato[] = [];

  constructor(
    private extratosService: ExtratosService,
    private authService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.transacoes = this.extratosService.transacoes;
    this.agencia = this.authService.contaConectada.agencia;
    this.numeroConta = this.authService.contaConectada.numero;
    this.dataInicio = this.extratosService.dataInicio;
    this.dataFinal = this.extratosService.dataFinal;
  }
}
