import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IContaTemp } from 'src/app/interfaces/conta-temp';
import { ILogin } from 'src/app/interfaces/login';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  formTransferencia: FormGroup = new FormGroup({
    agencia: new FormControl('', Validators.required),
    numeroConta: new FormControl('', Validators.required),
    valor: new FormControl(null, Validators.required),
    senha: new FormControl(null, Validators.required)
  });

  agenciaLogada: string = '';
  numeroContaLogada: string = '';
  saldoAtual: number = 0;

  constructor(
    private contasService: ContasService,
    private authService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.agenciaLogada = this.authService.contaConectada.agencia;
    this.numeroContaLogada = this.authService.contaConectada.numero;
    this.saldoAtual = this.authService.contaConectada.saldo;
    if(this.contasService.encaminhamentoTransacao){
      this.formTransferencia = this.preencherFormGroup(this.contasService.temp);
    }
  }

  transferencia(){
    const agencia: string = this.formTransferencia.get('agencia')?.value;
    const numeroConta: string = this.formTransferencia.get('numeroConta')?.value;
    const login: ILogin = {
      agencia: this.authService.contaConectada.agencia,
      numeroConta: this.authService.contaConectada.numero,
      senha: this.formTransferencia.get('senha')?.value
    }
    this.authService.autenticar(login).subscribe(() => {
      this.contasService.buscarPorAgenciaEhNumero(agencia, numeroConta).subscribe((result) => {
        this.contasService.temp.agencia = result.agencia;
        this.contasService.temp.numero = result.numero;
        this.contasService.temp.nomeCliente = result.nomeCliente;
        this.contasService.temp.valor = this.formTransferencia.get('valor')?.value;
        this.router.navigate(['user/confirmar-transferencia']);
      }, (error) => {
        alert('Erro na transferência');
        console.log(error);
      });
    }, (error) => {
      alert('Senha inválida');
      console.log(error);
    });
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
