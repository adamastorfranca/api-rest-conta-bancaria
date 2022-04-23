import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IToken } from 'src/app/interfaces/token';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  agencia='';
  numeroConta='';
  senha='';

  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.autenticar(this.agencia, this.numeroConta, this.senha).subscribe(
      () => {
        this.router.navigate(['conta']);
      },
      (error) => {
        alert('Usuário ou senha inválido');
        console.log(error);
      }
    );
  }
}
