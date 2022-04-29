import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-agencia-numero',
  templateUrl: './agencia-numero.component.html',
  styleUrls: ['./agencia-numero.component.css']
})
export class AgenciaNumeroComponent implements OnInit {

  formConsultaConta: FormGroup = new FormGroup({
    agencia: new FormControl('', [Validators.required]),
    numeroConta: new FormControl('', [Validators.required])
  })

  agenciaLogada: string = '';
  numeroContaLogada: string = '';

  constructor(
    private contaService: ContasService,
    private authService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.agenciaLogada = this.authService.contaConectada.agencia;
    this.numeroContaLogada = this.authService.contaConectada.numero;
  }

  consulta(): void {
    if (this.formConsultaConta.valid){
      const agencia: string = this.formConsultaConta.get('agencia')?.value;
      const numeroConta: string = this.formConsultaConta.get('numeroConta')?.value;
      this.contaService.buscarPorAgenciaEhNumero(agencia, numeroConta).subscribe((result) => {
        this.contaService.temp.agencia = result.agencia;
        this.contaService.temp.numero = result.numero;
        this.contaService.temp.nomeCliente = result.nomeCliente;
        this.router.navigate(['user/informacoes-conta']);
      },
      (error) => {
        alert('A conta informada não existe');
        console.error(error);
        this.formConsultaConta.reset();
      });
    }
  }
}
