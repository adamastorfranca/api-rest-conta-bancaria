import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  agencia: string = '';
  numeroConta: string = '';
  valor: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  transferir(){
    console.log('Transferência realizada!');
    console.log('Agência: ', this.agencia);
    console.log('Conta: ', this.numeroConta);
    console.log('Valor: R$ ', this.valor);
  }

}
