import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  agencia='';
  numeroConta='';
  senha='';

  constructor(private authService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.autenticar(this.agencia, this.numeroConta, this.senha).subscribe(
      () => {
        console.log('Autenticado com sucesso');
      },
      (error) => {
        alert('Usuário ou senha inválido');
        console.log(error);
      }
    );
  }
}
