import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IContaTemp } from 'src/app/interfaces/conta-temp';
import { IDepositoSaque } from 'src/app/interfaces/deposito-saque';
import { ITransferencia } from 'src/app/interfaces/transferencia';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent implements OnInit {

  paraConfirmar: IContaTemp = {
    nomeCliente: '',
    agencia: '',
    numero: '',
    valor: 0
  }

 confirmarDeposito: boolean = false;

  constructor(
    private contaService: ContasService,
    private authService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paraConfirmar = this.contaService.temp;
  }

  confirmacaoTransacao(){
    const transferencia: ITransferencia = {
      agenciaOrigem: this.authService.contaConectada.agencia,
      numeroContaOrigem: this.authService.contaConectada.numero,
      agenciaDestino: this.paraConfirmar.agencia,
      numeroContaDestino: this.paraConfirmar.numero,
      valor: this.paraConfirmar.valor
    }

    if(this.confirmarDeposito === true){
      this.contaService.transferir(transferencia).subscribe(() => {  });
      this.authService.contaConectada.saldo -= transferencia.valor;
      this.router.navigate(['user/transferencia-realizada']);
    }
  }
}
