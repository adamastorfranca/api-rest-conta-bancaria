import { Component, OnInit } from '@angular/core';
import { IContaTemp } from 'src/app/interfaces/conta-temp';
import { ContasService } from 'src/app/services/contas.service';
import { CadastroComponent } from '../cadastro.component';

@Component({
  selector: 'app-bem-vindo',
  templateUrl: './bem-vindo.component.html',
  styleUrls: ['./bem-vindo.component.css']
})
export class BemVindoComponent implements OnInit {

  novaConta: IContaTemp = {
    nomeCliente: '',
    agencia: '',
    numero: '',
    valor: 0
  }

  constructor(private contasService: ContasService) { }

  ngOnInit(): void {
    this.novaConta = this.contasService.temp;
  }

}
