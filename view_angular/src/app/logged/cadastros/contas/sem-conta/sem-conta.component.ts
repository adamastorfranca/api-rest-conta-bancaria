import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ICadastro } from 'src/app/interfaces/cadastro';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sem-conta',
  templateUrl: './sem-conta.component.html',
  styleUrls: ['./sem-conta.component.css']
})
export class SemContaComponent implements OnInit {

  emptyCliente: ICliente = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    dataNascimento: ''
  }

  formCadastro: FormGroup = this.preencherFormGroup(this.emptyCliente);

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private contasService: ContasService,
    private clientesService: ClientesService
  ) { }

  ngOnInit(): void {
    const id = Number(this.activedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.clientesService.buscarPorId(id).subscribe((result: ICliente) => {
        this.formCadastro = this.preencherFormGroup(result);
      }, error => {
        console.error(error);
      })
    }
  }

  preencherFormGroup(cliente: ICliente): FormGroup {
    return new FormGroup({
      nome: new FormControl(cliente.nome, Validators.required),
      cpf: new FormControl(cliente.cpf, Validators.required),
      email: new FormControl(cliente.email, [Validators.required, Validators.email]),
      telefone: new FormControl(cliente.telefone, Validators.required),
      dataNascimento: new FormControl(cliente.dataNascimento, Validators.required),
      senha: new FormControl('', Validators.required),
      senhaConfirmar: new FormControl('', Validators.required),
    });
  }

  enviar() {
    const conta: ICadastro = this.formCadastro.value;
    this.contasService.cadastro(conta).subscribe((result) => {
      Swal.fire('Sucesso', 'Cadastrado com sucesso!', 'success').then(() => this.router.navigate(['/user/contas']));
    });
  }
}
