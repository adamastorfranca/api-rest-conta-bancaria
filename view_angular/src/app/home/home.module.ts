import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { InicialComponent } from './inicial/inicial.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastros/cadastro.component';
import { DepositoComponent } from './deposito/deposito.component';
import { BemVindoComponent } from './cadastros/bem-vindo/bem-vindo.component';
import { RouterModule } from '@angular/router';
import { ConfirmarComponent } from './deposito/confirmar/confirmar.component';
import { ConfirmadoComponent } from './deposito/confirmar/confirmado/confirmado.component';
import { ClienteComponent } from './consultas/clientes/cliente.component';
import { ContaComponent } from './consultas/contas/conta.component';
import { InformacoesContaComponent } from './consultas/contas/informacoes/informacoes.component';
import { InformacoesClienteComponent } from './consultas/clientes/informacoes/informacoes.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    InicialComponent,
    DepositoComponent,
    BemVindoComponent,
    ConfirmarComponent,
    ConfirmadoComponent,
    ClienteComponent,
    ContaComponent,
    InformacoesContaComponent,
    InformacoesClienteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HomeRoutingModule
  ],
  exports: []
})
export class HomeModule { }
