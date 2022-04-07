import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from "src/app/models/cliente.model";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  @Output() aoCadastrar = new EventEmitter<any>();

  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  observacoes: string;

  constructor(private clientesService: ClientesService) { }

  clientes: Cliente[] = [];

  ngOnInit(): void {

  }

  cadastrar(){
    const cadastroEmitir = {nome: this.nome, cpf: this.cpf, email: this.email, telefone: this.telefone, observacoes: this.observacoes};
    this.aoCadastrar.emit(cadastroEmitir);
  }

  listarTodos() {
    this.clientesService.listarTodosClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
      console.table(this.clientes);
    });
  }
}
