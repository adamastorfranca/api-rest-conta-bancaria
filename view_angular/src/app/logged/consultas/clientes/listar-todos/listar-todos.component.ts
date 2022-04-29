import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ICliente } from 'src/app/interfaces/cliente';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-todos',
  templateUrl: './listar-todos.component.html',
  styleUrls: ['./listar-todos.component.css']
})
export class ListarTodosComponent implements OnInit {

  clientes: ICliente[] = [];
  idConectado: number = this.authService.contaConectada.id;

  constructor(
    private router: Router,
    private clienteService: ClientesService,
    private authService: AutenticacaoService,
    private contaService: ContasService
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    this.clienteService.listarTodosClientes().subscribe((result: ICliente[]) => {
      this.clientes = result.filter((cliente: ICliente) =>{
        return cliente.id !== this.idConectado;
      })
    });
  }

  confirmar(id: number) {
    Swal.fire({
      title: 'Você está certo disso?',
      text: "Tem certeza que deseja remover este cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.remover(id).subscribe(() => {
          Swal.fire({
            title: 'Removido!',
            text: 'Cliente removido com sucesso!',
            icon: 'success'
          });
          this.listarTodos();
        }, error => {
          console.error(error);
        });
      }
    })
  }

  depositar(cpf: string){
    this.contaService.encaminhamentoTransacao = true;
    this.contaService.buscarPorCpf(cpf).subscribe( result => {
      this.contaService.temp.agencia = result.agencia;
      this.contaService.temp.numero = result.numero;
      this.contaService.temp.nomeCliente = result.nomeCliente;
      this.router.navigate(['/user/deposito']);
    });
  }

  tranferir(cpf: string){
    this.contaService.encaminhamentoTransacao = true;
    this.contaService.buscarPorCpf(cpf).subscribe( result => {
      this.contaService.temp.agencia = result.agencia;
      this.contaService.temp.numero = result.numero;
      this.contaService.temp.nomeCliente = result.nomeCliente;
      this.router.navigate(['/user/transferencia']);
    });
  }
}
