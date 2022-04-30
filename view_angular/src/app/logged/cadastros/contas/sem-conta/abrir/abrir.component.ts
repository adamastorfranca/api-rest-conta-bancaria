import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-abrir',
  templateUrl: './abrir.component.html',
  styleUrls: ['./abrir.component.css']
})
export class AbrirComponent implements OnInit {

  emptyCliente: ICliente = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    temConta: true,
  }

  formCadastro: FormGroup = this.preencherFormGroup(this.emptyCliente);

  formCliente: FormGroup = new FormGroup({
    cliente: new FormControl('')
  })

  clientesSemConta: ICliente[] = [];

  constructor(
    private clienteService: ClientesService
  ) { }

  ngOnInit(): void {
    this.listarClienteSemConta();
  }

  listarClienteSemConta() {
    this.clienteService.buscarSemConta().subscribe(result => {
      this.clientesSemConta = result;
    })
  }

  preencherFormGroup(cliente: ICliente): FormGroup {
    return new FormGroup({
      id: new FormControl(cliente.id ? cliente.id : null),
      nome: new FormControl(cliente.nome ? cliente.nome : '', Validators.required),
      email: new FormControl(cliente.email ? cliente.email : '', Validators.required),
      cpf: new FormControl(cliente.cpf ? cliente.cpf : '', Validators.required),
      telefone: new FormControl(cliente.telefone ? cliente.telefone : '', Validators.required),
      dataNascimento: new FormControl(cliente.telefone ? cliente.telefone : '', Validators.required),
      senha: new FormControl('', Validators.required),
      senhaConfirmar: new FormControl('', Validators.required),
    });
  }

  preencherComSetValue() {
    this.formCadastro.setValue({
      nome: this.emptyCliente.nome,
      email: this.emptyCliente.email,
      cpf: this.emptyCliente.cpf,
      telefone: this.emptyCliente.telefone,
      dataNascimento: this.emptyCliente.dataNascimento
    });
  }

  enviar() {

  }

}
