import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ICadastro } from 'src/app/interfaces/cadastro';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  formCadastroConta!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contasService: ContasService
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

  enviar() {
    const cadastro = this.formCadastroConta.getRawValue() as ICadastro;

    this.contasService.cadastrar(cadastro).subscribe((result) => {
      Swal.fire('Sucesso', 'Cadastrado com sucesso!', 'success').then(() => this.router.navigate(['/user/contas']));
    },
    (error) => {
      console.log(error);
    });
  }
}
