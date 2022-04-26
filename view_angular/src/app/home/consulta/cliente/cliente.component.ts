import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  formConsultaCliente: FormGroup = new FormGroup({
    cpf: new FormControl('', [Validators.required]),
  })

  constructor(
    private contaService: ContasService
  ) { }

  ngOnInit(): void {
  }

  consulta(): void {

  }

}
