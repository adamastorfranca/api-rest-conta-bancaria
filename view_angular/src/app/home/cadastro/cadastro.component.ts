import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IContaTemp } from 'src/app/interfaces/contaTemp';
import { ICadastro } from 'src/app/interfaces/cadastro';
import { ContasService } from '../../services/contas.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formCadastroConta!: FormGroup;

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
        this.contasService.temp.agencia = result.agencia;
        this.contasService.temp.numero = result.numero;
        this.contasService.temp.nomeCliente = result.nomeCliente;
        this.router.navigate(['bem-vindo']);
      },
      (error) => {
        console.log(error);
      }
     );
    }
  }

}
