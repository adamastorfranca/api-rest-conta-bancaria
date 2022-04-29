import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IExtrato } from 'src/app/interfaces/extrato';
import { IExtratoEspecifico } from 'src/app/interfaces/extrato-especifico';

import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ExtratosService } from 'src/app/services/extratos.service';

@Component({
  selector: 'app-periodo-especifico',
  templateUrl: './periodo-especifico.component.html',
  styleUrls: ['./periodo-especifico.component.css']
})
export class PeriodoEspecificoComponent implements OnInit {

  agencia: string = '';
  numeroConta: string = '';

  formExtrato!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private extratosService: ExtratosService,
    private authService: AutenticacaoService
  ) { }

  ngOnInit(): void {

    this.formExtrato = this.formBuilder.group({
      agencia: ['', [Validators.required]],
      numeroConta: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      dataFinal: ['', [Validators.required]]
      });
  }

  listarPorPeriodo() {
    let periodoEspecifico = this.formExtrato.getRawValue() as IExtratoEspecifico;
    periodoEspecifico.agencia = this.agencia = this.authService.contaConectada.agencia;
    periodoEspecifico.numeroConta = this.numeroConta = this.authService.contaConectada.numero;

    this.extratosService.extratoPeriodoEspecifico(periodoEspecifico).subscribe((result: IExtrato[]) => {
      this.extratosService.transacoes = result;
      this.extratosService.dataInicio = periodoEspecifico.dataInicio;
      this.extratosService.dataFinal = periodoEspecifico.dataFinal;
      this.router.navigate(['/user/transacoes-periodo-especifico']);
    },
    (error) => {
      alert('Nenhuma transação realizada no período');
      console.error(error);
    });
  }
}
