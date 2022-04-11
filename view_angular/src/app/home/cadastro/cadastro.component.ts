import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContasService } from 'src/app/home/cadastro/cadastro.service';
import { IConta } from 'src/app/interfaces/conta';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formCadastroConta!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contasService: ContasService
  ) { }

  ngOnInit(): void {
    this.formCadastroConta = this.formBuilder.group({
    nome: [''],
    cpf: [''],
    email: [''],
    telefone: [''],
    dataNascimento: [''],
    senha: [''],
    senhaConfirmar: [''],
    });
  }

  cadastrar() {
    const cadastro = this.formCadastroConta.getRawValue() as IConta;
    console.log(cadastro);
  }

}
