import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICadastrado } from 'src/app/interfaces/cadastrado';
import { ICadastro } from 'src/app/interfaces/cadastro';
import { ContasService } from '../../services/contas.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formCadastroConta!: FormGroup;

  novaConta: ICadastrado = {
    nomeCliente: '',
    agencia: '',
    numero: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private contasService: ContasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formCadastroConta = this.formBuilder.group({
    nome: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required]],
    dataNascimento: ['', [Validators.required]],
    senha: ['', [Validators.required]],
    senhaConfirmar: ['', [Validators.required]],
    });
  }

  cadastrar() {
    if (this.formCadastroConta.valid){
      const cadastro = this.formCadastroConta.getRawValue() as ICadastro;
      this.contasService.cadastrar(cadastro).subscribe((result) => {
        this.novaConta.agencia = result.agencia;
        this.novaConta.nomeCliente = result.nomeCliente;
        this.novaConta.numero = result.numero;
        console.log(this.novaConta);
        this.router.navigate(['bem-vindo']);
      },
      (error) => {
        console.log(error);
      }
     );
    }
  }

}
