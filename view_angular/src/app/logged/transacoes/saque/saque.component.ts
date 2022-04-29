import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDepositoSaque } from 'src/app/interfaces/deposito-saque';
import { ILogin } from 'src/app/interfaces/login';

import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})
export class SaqueComponent implements OnInit {

  formSaque: FormGroup = new FormGroup({
    valor: new FormControl(null, [Validators.required]),
    senha: new FormControl('', [Validators.required])
  });

  saldoAtual: number = 0;

  constructor(
    private contaService: ContasService,
    private authService: AutenticacaoService,
    private router: Router
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
    const login: ILogin = {
      agencia: this.authService.contaConectada.agencia,
      numeroConta: this.authService.contaConectada.numero,
      senha: this.formSaque.get('senha')?.value
    }
    this.authService.autenticar(login).subscribe((result) => {
      this.contaService.sacar(saque).subscribe((result) => {
        this.authService.contaConectada.saldo -= saque.valor;
        this.contaService.temp.valor = saque.valor;
        this.router.navigate(['user/saque-realizado']);
      }, (error) => {
        console.log(error);
      });
    },
    (error) => {
      alert('Senha inválida');
      console.log(error);
    });
  }
}
