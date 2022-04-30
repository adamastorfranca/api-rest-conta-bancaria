import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ICadastro } from 'src/app/interfaces/cadastro';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-todas',
  templateUrl: './listar-todas.component.html',
  styleUrls: ['./listar-todas.component.css']
})
export class ListarTodasComponent implements OnInit {

  filter: string = '';
  contas: ICadastro[] = [];
  idConectado: number = this.authService.contaConectada.id;

  constructor(
    private router: Router,
    private contasService: ContasService,
    private authService: AutenticacaoService,
    private contaService: ContasService
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    this.contasService.buscarTodas().subscribe((result: ICadastro[]) => {
      this.contas = result.filter((contas: ICadastro) =>{
        return contas.id !== this.idConectado;
      })
    });
  }

/*   confirmar(id: number) {
    Swal.fire({
      title: 'Você está certo disso?',
      text: "Tem certeza que deseja remover este cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contasService.remover(id).subscribe(() => {
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
  } */

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

  digitado(target : any) {
    if(target instanceof EventTarget) {
      var elemento = target as HTMLInputElement;
      this.filter = elemento.value;
    }
  }
}
