import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ICadastro } from 'src/app/interfaces/cadastro';
import { ICliente } from 'src/app/interfaces/cliente';
import { IContaEdicao } from 'src/app/interfaces/conta-edicao';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {


  emptyConta: ICadastro = {
    id: 0,
    cpf: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    senha: '',
    senhaConfirmar: '',
    idCliente: 0,
    nomeCliente: '',
    agencia: '',
    numero: '',
  }

  formCadastro: FormGroup = this.preencherFormGroup(this.emptyConta);

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private contasService: ContasService,
    private clientesService: ClientesService,
    private authService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    const id = Number(this.activedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.formCadastro.get('cpf')?.disable();
      this.formCadastro.get('dataNascimento')?.disable();
      this.contasService.buscarPorId(id).subscribe((result: ICadastro) => {
        console.log(result)
        this.formCadastro = this.preencherFormGroup(result);
      }, error => {
        console.error(error);
      })
    }
  }

  preencherFormGroup(conta: ICadastro): FormGroup {
    return new FormGroup({
      id: new FormControl(conta.id ? conta.id : null),
      agencia: new FormControl(conta.agencia, Validators.required),
      numeroConta: new FormControl(conta.numero, Validators.required),
      idCliente: new FormControl(conta.idCliente, Validators.required),
      nome: new FormControl(conta.nomeCliente, Validators.required),
      cpf: new FormControl(conta.cpf, Validators.required),
      email: new FormControl(conta.email, [Validators.required, Validators.email]),
      telefone: new FormControl(conta.telefone, Validators.required),
      dataNascimento: new FormControl(conta.dataNascimento, Validators.required),
      senha: new FormControl('', [Validators.required]),
      senhaConfirmar: new FormControl('', [Validators.required]),
    });
  }

  enviar() {
    const atualizacaoCliente: ICliente = {
      id: this.formCadastro.get('idCliente')?.value,
      nome: this.formCadastro.get('nome')?.value,
      cpf: this.formCadastro.get('cpf')?.value,
      email: this.formCadastro.get('email')?.value,
      telefone: this.formCadastro.get('telefone')?.value,
      dataNascimento: this.formCadastro.get('dataNascimento')?.value,
    }

    const atualizacaoConta: IContaEdicao = {
      id: this.formCadastro.get('id')?.value,
      agencia: this.formCadastro.get('agencia')?.value,
      numero: this.formCadastro.get('numeroConta')?.value,
      senha: this.formCadastro.get('senha')?.value,
      senhaConfirmar: this.formCadastro.get('senhaConfirmar')?.value,
    }

    this.contasService.editar(atualizacaoConta).subscribe((result) => { })
    this.clientesService.editar(atualizacaoCliente).subscribe((result) => {
      Swal.fire('Sucesso', 'Editado com sucesso!', 'success').then(() => this.router.navigate(['/user/contas']));
    })

    this.authService.contaConectada.agencia = this.formCadastro.get('agencia')?.value;
    this.authService.contaConectada.numero = this.formCadastro.get('numeroConta')?.value;
    this.authService.contaConectada.nomeCliente = this.formCadastro.get('nome')?.value;
    console.log(this.authService.contaConectada)
  }

}
