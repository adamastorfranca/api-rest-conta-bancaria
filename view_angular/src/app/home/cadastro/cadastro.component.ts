import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required]],
    dataNascimento: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    senhaConfirmar: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
  }

  cadastrar() {
    if (this.formCadastroConta.valid){
      const cadastro = this.formCadastroConta.getRawValue() as ICadastro;
      this.contasService.cadastrar(cadastro).subscribe(() => {
        this.router.navigate(['login']);
      },
      (error) => {
        console.log(error);
      }
     );
    }
  }

}
