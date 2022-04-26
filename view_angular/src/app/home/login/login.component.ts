import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interfaces/login';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({
    agencia: new FormControl('', [Validators.required]),
    numeroConta: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required])
  })

  constructor(
    private authService: AutenticacaoService,
    private contaService: ContasService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.formLogin.valid){
      const login = this.formLogin.getRawValue() as ILogin;
      const agencia: string = this.formLogin.get('agencia')?.value;
      const numeroConta: string = this.formLogin.get('numeroConta')?.value;
      
      this.authService.autenticar(login).subscribe(() => {
        this.contaService.buscarInformacoes(agencia, numeroConta).subscribe((result) => {
          this.authService.contaConectada = result;
          console.log(this.authService.contaConectada)
        });
        this.router.navigate(['user']);
      },
      (error) => {
        alert('Usuário ou senha inválido');
        console.log(error);
      }
     );
    }
  }
}
