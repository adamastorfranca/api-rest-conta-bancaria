import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContaTemp } from 'src/app/interfaces/contaTemp';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-informacoes',
  templateUrl: './informacoes.component.html',
  styleUrls: ['./informacoes.component.css']
})
export class InformacoesComponent implements OnInit {

  resultadoBusca: IContaTemp = {
    nomeCliente: '',
    agencia: '',
    numero: '',
    valor: 0
  }

  acao: boolean | null = null;

  constructor(
    private contaService: ContasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resultadoBusca = this.contaService.temp;
  }

  confirmarAcao(){
    if(this.acao === true){
      this.router.navigate(['deposito']);
    }
    if(this.acao === false){
      this.router.navigate(['consulta-conta']);
    }
  }
}
