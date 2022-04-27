import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IContaTemp } from 'src/app/interfaces/conta-temp';
import { IDepositoSaque } from 'src/app/interfaces/deposito-saque';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  paraConfirmar: IContaTemp = {
    nomeCliente: '',
    agencia: '',
    numero: '',
    valor: 0
  }

 confirmarTransacao: boolean = false;

  constructor(
    private contaService: ContasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paraConfirmar = this.contaService.temp;
  }

  confirmacaoDeposito(){
    const deposito: IDepositoSaque = {
       agencia: this.paraConfirmar.agencia,
       numeroConta: this.paraConfirmar.numero,
       valor: this.paraConfirmar.valor
    }
    if(this.confirmarTransacao === true){
      this.contaService.depositar(deposito).subscribe(() => {
        this.router.navigate(['deposito-realizado']);
      });
    }
  }

}
