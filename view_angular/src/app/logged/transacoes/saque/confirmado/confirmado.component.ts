import { Component, OnInit } from '@angular/core';
import { IContaTemp } from 'src/app/interfaces/conta-temp';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-confirmado',
  templateUrl: './confirmado.component.html',
  styleUrls: ['./confirmado.component.css']
})
export class ConfirmadoComponent implements OnInit {

  data: Date = new Date();
  saqueConfirmado: IContaTemp = {
    nomeCliente: '',
    agencia: '',
    numero: '',
    valor: 0
  }

  constructor(
    private contaService: ContasService
  ) { }

  ngOnInit(): void {
    this.saqueConfirmado = this.contaService.temp;
  }

}
