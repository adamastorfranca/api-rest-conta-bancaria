import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IContaTemp } from 'src/app/interfaces/conta-temp';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-deposito-logged',
  templateUrl: './deposito-logged.component.html',
  styleUrls: ['./deposito-logged.component.css']
})
export class DepositoLoggedComponent implements OnInit {

  formDepositoLogado: FormGroup = new FormGroup({
    agencia: new FormControl('', Validators.required),
    numeroConta: new FormControl('', Validators.required),
    valor: new FormControl(null, Validators.required)
  })

  constructor(
    private contasService: ContasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.contasService.encaminhamentoTransacao){
      this.formDepositoLogado = this.preencherFormGroup(this.contasService.temp);
    }
  }

  deposito(){
    const agencia: string = this.formDepositoLogado.get('agencia')?.value;
    const numeroConta: string = this.formDepositoLogado.get('numeroConta')?.value;
    this.contasService.buscarPorAgenciaEhNumero(agencia, numeroConta).subscribe(result => {
      this.contasService.temp.agencia = result.agencia;
      this.contasService.temp.numero = result.numero;
      this.contasService.temp.nomeCliente = result.nomeCliente;
      this.contasService.temp.valor = this.formDepositoLogado.get('valor')?.value;
      this.router.navigate(['user/confirmar-deposito']);
    },
    (error) => {
      console.log(error);
    }
   );
  }

  preencherFormGroup(conta: IContaTemp): FormGroup {
    this.contasService.encaminhamentoTransacao = false;
    return new FormGroup({
    agencia: new FormControl(conta.agencia, Validators.required),
    numeroConta: new FormControl(conta.numero, Validators.required),
    valor: new FormControl(null, Validators.required)
    });
  }
}
