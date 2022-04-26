import { Component, OnInit } from '@angular/core';
import { ICadastrado } from 'src/app/interfaces/cadastrado';
import { ContasService } from 'src/app/services/contas.service';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Component({
  selector: 'app-bem-vindo',
  templateUrl: './bem-vindo.component.html',
  styleUrls: ['./bem-vindo.component.css']
})
export class BemVindoComponent implements OnInit {

  novaConta: ICadastrado = {
    nomeCliente: '',
    agencia: '',
    numero: ''
  }

  constructor(private contasService: ContasService) { }

  ngOnInit(): void {
    this.novaConta = this.contasService.cadastrado;
  }

}
