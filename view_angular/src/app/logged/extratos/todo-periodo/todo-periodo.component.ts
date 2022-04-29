import { Component, OnInit } from '@angular/core';

import { IExtrato } from 'src/app/interfaces/extrato';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ExtratosService } from 'src/app/services/extratos.service';

@Component({
  selector: 'app-todo-periodo',
  templateUrl: './todo-periodo.component.html',
  styleUrls: ['./todo-periodo.component.css']
})
export class TodoPeriodoComponent implements OnInit {

  agencia: string = '';
  numeroConta: string = '';

  transacoes: IExtrato[] = [];

  constructor(
    private extratosService: ExtratosService,
    private authService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.agencia = this.authService.contaConectada.agencia;
    this.numeroConta = this.authService.contaConectada.numero;
    this.listarTodoPeriodo();
  }

  listarTodoPeriodo() {
    this.extratosService.extratoTodoPeriodo(this.agencia, this.numeroConta).subscribe((result: IExtrato[]) => {
      this.transacoes = result;
    },
    (error) => {
      alert('Erro ao consultar extrato');
      console.error(error);
    });
  }
}
