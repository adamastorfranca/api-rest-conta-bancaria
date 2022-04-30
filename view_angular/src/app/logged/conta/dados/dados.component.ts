import { Component, OnInit } from '@angular/core';
import { ICadastro } from 'src/app/interfaces/cadastro';
import { IContaLogada } from 'src/app/interfaces/conta-logada';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit {

  contaLogada!: IContaLogada;
  dados!: ICadastro;

  constructor(
    private authService: AutenticacaoService,
    private contasService: ContasService
  ) { }

  ngOnInit(): void {
    this.contaLogada = this.authService.contaConectada;
    this.contasService.buscarPorId(this.contaLogada.id).subscribe(result => {
      this.dados = result;
    })
  }

}
