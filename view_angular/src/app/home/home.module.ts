import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensagemModule } from '../componentes/mensagem/mensagem.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { InicialComponent } from './inicial/inicial.component';
import { DepositoComponent } from './deposito/deposito.component';
import { InformacoesComponent } from './cadastro/informacoes/informacoes.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    InicialComponent,
    DepositoComponent,
    InformacoesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MensagemModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
