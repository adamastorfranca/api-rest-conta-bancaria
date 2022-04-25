import { Component, OnInit } from '@angular/core';
import { ICadastrado } from 'src/app/interfaces/cadastrado';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Component({
  selector: 'app-bem-vindo',
  templateUrl: './bem-vindo.component.html',
  styleUrls: ['./bem-vindo.component.css']
})
export class BemVindoComponent implements OnInit {

  cadastrado: ICadastrado = {
    nomeCliente: '',
    agencia: '',
    numero: ''
  }

  constructor(private novoCadastrado: CadastroComponent) { }

  ngOnInit(): void {
    this.cadastrado = this.novoCadastrado.novaConta;
  }

}
