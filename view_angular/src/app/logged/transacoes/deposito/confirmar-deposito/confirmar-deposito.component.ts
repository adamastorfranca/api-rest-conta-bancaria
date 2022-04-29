import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IContaTemp } from 'src/app/interfaces/conta-temp';
import { IDepositoSaque } from 'src/app/interfaces/deposito-saque';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-confirmar-deposito',
  templateUrl: './confirmar-deposito.component.html',
  styleUrls: ['./confirmar-deposito.component.css']
})
export class ConfirmarDepositoComponent implements OnInit {

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
    const deposito: IDepositoSaque = {
       agencia: this.paraConfirmar.agencia,
       numeroConta: this.paraConfirmar.numero,
       valor: this.paraConfirmar.valor
    }
    if(this.confirmarDeposito === true){
      this.contaService.depositar(deposito).subscribe(() => {  });
      this.router.navigate(['user/deposito-confirmado']);
    if (this.authService.contaConectada.agencia === deposito.agencia && this.authService.contaConectada.numero === deposito.numeroConta){
        this.authService.contaConectada.saldo += deposito.valor;
      }
    }
  }
}
