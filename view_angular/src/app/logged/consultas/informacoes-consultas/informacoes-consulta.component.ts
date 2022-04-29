import { Component, OnInit } from '@angular/core';

import { IContaTemp } from 'src/app/interfaces/conta-temp';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-informacoes-consulta',
  templateUrl: './informacoes-consulta.component.html',
  styleUrls: ['./informacoes-consulta.component.css']
})
export class InformacoesConsultaComponent implements OnInit {

  resultadoBusca: IContaTemp = {
    nomeCliente: '',
    agencia: '',
    numero: '',
    valor: 0
  }

  constructor(
    private contaService: ContasService
  ) { }

  ngOnInit(): void {
    this.resultadoBusca = this.contaService.temp;
    this.contaService.encaminhamentoTransacao = true;
  }

}
