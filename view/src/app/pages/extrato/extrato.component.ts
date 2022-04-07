import { Component, Input, OnInit } from '@angular/core';
import { TransferenciaService } from 'src/app/services/transferencia.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  transferencias: any[];

  constructor(private transferenciaService: TransferenciaService) { }

  ngOnInit(): void {
    this.transferencias = this.transferenciaService.listaTransferencias;
  }

}
