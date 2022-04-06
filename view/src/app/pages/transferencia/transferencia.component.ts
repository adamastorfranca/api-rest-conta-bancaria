import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  @Output() aoTransferir = new EventEmitter<any>();
  @Output() valoresComErro = new EventEmitter<string>();

  agencia: string;
  numeroConta: string;
  valor: number;

  constructor() { }

  ngOnInit(): void {
  }

  transferir(){
    if (this.ehValido()) {
      const valorEmitir = {agencia: this.agencia, numeroConta: this.numeroConta, valor: this.valor};
      this.aoTransferir.emit(valorEmitir);
    }
  }

  private ehValido() {
    const valido = this.valor > 0;
    if (!valido) {
        this.valoresComErro.emit('Informe um valor válido');
    }
    return valido;
  }



  /*limparCampos(){
    this.agencia = "0000";
    this.numeroConta = "0000-0"
    this.valor = 0.00
  } */

}
