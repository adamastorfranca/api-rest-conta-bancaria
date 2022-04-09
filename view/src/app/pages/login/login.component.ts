import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContasService } from 'src/app/services/contas.service';
import { Conta } from "src/app/models/conta.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() aoLogar = new EventEmitter<any>();

  agencia: string;
  numeroConta: string;
  senha: string;

  constructor(private contasService: ContasService) { }

  ngOnInit(): void {
  }

  logar(){
    const loginEmitir: Conta = {agencia: this.agencia, numeroConta: this.numeroConta, senha: this.senha};
    this.contasService.logar(loginEmitir).subscribe(
      (resultado) => {
        console.log(resultado);
      },
      (error) => console.error(error)
    );
  }


}

