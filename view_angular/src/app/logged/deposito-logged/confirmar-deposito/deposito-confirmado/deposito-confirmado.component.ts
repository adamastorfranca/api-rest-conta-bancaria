import { Component, OnInit } from '@angular/core';

import { IContaTemp } from 'src/app/interfaces/conta-temp';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-deposito-confirmado',
  templateUrl: './deposito-confirmado.component.html',
  styleUrls: ['./deposito-confirmado.component.css']
})
export class DepositoConfirmadoComponent implements OnInit {

  data: Date = new Date();
  depositoConfirmado: IContaTemp = {
    nomeCliente: '',
    agencia: '',
    numero: '',
    valor: 0
  }

  constructor(
    private contaService: ContasService
  ) { }

  ngOnInit(): void {
    this.depositoConfirmado = this.contaService.temp;
  }

}
