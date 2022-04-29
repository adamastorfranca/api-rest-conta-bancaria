import { Component, OnInit } from '@angular/core';

import { IExtrato } from 'src/app/interfaces/extrato';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ExtratosService } from 'src/app/services/extratos.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  agencia: string = '';
  numeroConta: string = '';
  mes: string = '';
  ano: string = '';


  transacoes: IExtrato[] = [];

  constructor(
    private extratosService: ExtratosService,
    private authService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.transacoes = this.extratosService.transacoes;
    this.agencia = this.authService.contaConectada.agencia;
    this.numeroConta = this.authService.contaConectada.numero;
    this.mes = this.extratosService.mes;
    this.ano = this.extratosService.ano;
    this.listarPorMesAno();
  }

  listarPorMesAno() {
    this.extratosService.extratoTodoPeriodo(this.agencia, this.numeroConta).subscribe((result: IExtrato[]) => {
      this.transacoes = result;
    },
    (error) => {
      alert('Erro ao consultar extrato');
      console.error(error);
    });
  }
}
