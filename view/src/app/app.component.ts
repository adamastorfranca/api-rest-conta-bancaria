import { Component } from '@angular/core';
import { ClientesService } from './services/clientes.service';
import { TransferenciaService } from './services/transferencia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'view';

  constructor(private transferenciaService: TransferenciaService,
              private clienteService: ClientesService) { }

  transferir($event){
    this.transferenciaService.adicionar($event);
  }

  cadastrarCliente($event){
    this.clienteService.cadastrar($event);
  }
}
