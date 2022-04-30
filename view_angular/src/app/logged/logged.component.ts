import { Component, OnInit } from '@angular/core';

import { IContaLogada } from '../interfaces/conta-logada';
import { AutenticacaoService } from '../services/autenticacao.service';
import Swal from 'sweetalert2';
import { ContasService } from '../services/contas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {

  contaConectada: IContaLogada = {
    id: 0,
    agencia: '',
    numero: '',
    saldo: 0,
    idCliente: 0,
    nomeCliente: '',
    cpf: ''
  }

  mostrarSaldo: boolean = true;

  constructor(
    private router: Router,
    private authService: AutenticacaoService,
    private contasService: ContasService
  ) { }

  ngOnInit(): void {
    this.contaConectada = this.authService.contaConectada;
  }

  confirmar(id: number) {
    Swal.fire({
      title: 'Você está certo disso?',
      text: "Tem certeza que deseja remover esta conta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contasService.remover(id).subscribe(() => {
          Swal.fire({
            title: 'Removida!',
            text: 'Conta removida com sucesso!',
            icon: 'success'
          });
          this.router.navigate(['']);
        }, error => {
          console.error(error);
        });
      }
    })
  }
}
