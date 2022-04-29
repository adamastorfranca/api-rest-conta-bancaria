import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IExtrato } from 'src/app/interfaces/extrato';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ExtratosService } from 'src/app/services/extratos.service';

@Component({
  selector: 'app-por-mes-ano',
  templateUrl: './por-mes-ano.component.html',
  styleUrls: ['./por-mes-ano.component.css']
})
export class PorMesAnoComponent implements OnInit {

  agencia: string = '';
  numeroConta: string = '';

  meses = [
    { id: 1, mes: "Janeiro" },
    { id: 2, mes: "Fevereiro" },
    { id: 3, mes: "Março" },
    { id: 4, mes: "Abril" },
    { id: 5, mes: "Maio" },
    { id: 6, mes: "Junho" },
    { id: 7, mes: "Julho" },
    { id: 8, mes: "Agosto" },
    { id: 9, mes: "Setembro" },
    { id: 10, mes: "Outubro" },
    { id: 11, mes: "Novembro" },
    { id: 12, mes: "Dezembro" },
  ];

  anos = [
    { id: 2020, ano: "2020" },
    { id: 2021, ano: "2021" },
    { id: 2022, ano: "2022" },
  ];

  formExtrato: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private extratosService: ExtratosService,
    private authService: AutenticacaoService
  ) {
    this.formExtrato = this.formBuilder.group({meses: [null], anos: [null]})
  }

  ngOnInit(): void {
    this.agencia = this.authService.contaConectada.agencia;
    this.numeroConta = this.authService.contaConectada.numero;
  }

  listarPorMesAno() {
    const mesEscolha = this.formExtrato.get('meses')?.value;
    const anoEscolha = this.formExtrato.get('anos')?.value;

    this.extratosService.ano = anoEscolha;
    this.meses.forEach(mes => {
      if(mes.id === mesEscolha) {
        this.extratosService.mes = mes.mes;
      }
    })

    this.extratosService.extratoPorMesAno(this.agencia, this.numeroConta, mesEscolha, anoEscolha).subscribe((result: IExtrato[]) => {
      this.extratosService.transacoes = result;
      this.router.navigate(['/user/transacoes-por-mes-ano']);
    },
    (error) => {
      alert('Nenhuma transação realizada no período');
      console.error(error);
    });
  }
}
