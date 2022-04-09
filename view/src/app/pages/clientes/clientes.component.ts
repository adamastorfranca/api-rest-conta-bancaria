import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from "src/app/models/cliente.model";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
  }

}
