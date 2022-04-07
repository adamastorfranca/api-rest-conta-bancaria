import { Injectable } from '@angular/core';
import { Transferencia } from '../models/transferencia.model';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  private transferencias: any[];

  constructor() {
    this.transferencias = [];
  }

  get listaTransferencias() {
    return this.transferencias;
  }

  adicionar(transferencia: Transferencia){
    this.adicionarDataHora(transferencia);
    this.transferencias.push(transferencia);
  }

  private adicionarDataHora(transferencia: any){
    transferencia.data = new Date();
  }
}
