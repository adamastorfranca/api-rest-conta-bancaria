import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ContasService } from 'src/app/services/contas.service';
import { IContaTemp } from 'src/app/interfaces/conta-temp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {

  formDeposito: FormGroup = new FormGroup({
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
      this.formDeposito = this.preencherFormGroup(this.contasService.temp);
    }
  }

  novoDeposito(){
    const agencia: string = this.formDeposito.get('agencia')?.value;
    const numeroConta: string = this.formDeposito.get('numeroConta')?.value;
    this.contasService.buscarPorAgenciaEhNumero(agencia, numeroConta).subscribe(result => {
      this.contasService.temp.agencia = result.agencia;
      this.contasService.temp.numero = result.numero;
      this.contasService.temp.nomeCliente = result.nomeCliente;
      this.contasService.temp.valor = this.formDeposito.get('valor')?.value;
      this.router.navigate(['confirmacao-deposito']);
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
