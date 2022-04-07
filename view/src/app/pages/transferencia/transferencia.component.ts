import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  @Output() aoTransferir = new EventEmitter<any>();

  agencia: string;
  numeroConta: string;
  valor: number;

  constructor() { }

  ngOnInit(): void {
  }

  transferir(){
    const valorEmitir = {agencia: this.agencia, numeroConta: this.numeroConta, valor: this.valor};
    this.aoTransferir.emit(valorEmitir);
    this.limparCampos();
  }

  limparCampos(){
    this.agencia = ' ';
    this.numeroConta = ' ';
    this.valor =  0;
  }

}
