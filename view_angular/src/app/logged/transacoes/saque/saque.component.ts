import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDepositoSaque } from 'src/app/interfaces/deposito-saque';

import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})
export class SaqueComponent implements OnInit {

  saldoAtual: number = 0;

  formSaque: FormGroup = new FormGroup({
    valor: new FormControl(null, [Validators.required])
  })

  constructor(
    private contaService: ContasService,
    private authService: AutenticacaoService,
  ) { }

  ngOnInit(): void {
    this.saldoAtual = this.authService.contaConectada.saldo;
  }

  saque(){
    const saque: IDepositoSaque = {
      agencia: this.authService.contaConectada.agencia,
      numeroConta: this.authService.contaConectada.numero,
      valor: this.formSaque.get('valor')?.value
   }
    this.contaService.sacar(saque).subscribe(result => {
//
    },
    (error) => {
      console.log(error);
    }
   );
  }
}
