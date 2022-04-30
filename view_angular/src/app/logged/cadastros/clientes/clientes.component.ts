import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

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
    private clientesService: ClientesService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.activedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.formCadastro.get('cpf')?.disable();
      this.formCadastro.get('dataNascimento')?.disable();
      this.clientesService.buscarPorId(id).subscribe((result: ICliente) => {
        this.formCadastro = this.preencherFormGroup(result);
      }, error => {
        console.error(error);
      })
    }
  }

  preencherFormGroup(cliente: ICliente): FormGroup {
    return new FormGroup({
      id: new FormControl(cliente.id ? cliente.id : null),
      nome: new FormControl(cliente.nome, Validators.required),
      cpf: new FormControl(cliente.cpf, Validators.required),
      email: new FormControl(cliente.email, [Validators.required, Validators.email]),
      telefone: new FormControl(cliente.telefone, Validators.required),
      dataNascimento: new FormControl(cliente.dataNascimento, Validators.required),
    });
  }

  enviar() {
    const cliente: ICliente = this.formCadastro.value;
    if (!this.estaEditando()) {
      this.clientesService.cadastrar(cliente).subscribe((result) => {
        Swal.fire('Sucesso', 'Cadastrado com sucesso!', 'success').then(() => {this.router.navigate(['/user/clientes']);});
      });
    } else {
      this.clientesService.editar(cliente).subscribe((result) => {
        Swal.fire('Sucesso', 'Editado com sucesso!', 'success').then(() => {this.router.navigate(['/user/clientes']);});
      });
    }
  }

  estaEditando() {
    return !!this.formCadastro.get("id")?.value;
  }
}
