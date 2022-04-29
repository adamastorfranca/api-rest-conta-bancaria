import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BemVindoComponent } from './cadastros/bem-vindo/bem-vindo.component';
import { CadastroComponent } from './cadastros/cadastro.component';
import { ClienteComponent } from './consultas/clientes/cliente.component';
import { InformacoesClienteComponent } from './consultas/clientes/informacoes/informacoes.component';
import { ContaComponent } from './consultas/contas/conta.component';
import { InformacoesContaComponent } from './consultas/contas/informacoes/informacoes.component';
import { ConfirmadoComponent } from './deposito/confirmar/confirmado/confirmado.component';
import { ConfirmarComponent } from './deposito/confirmar/confirmar.component';
import { DepositoComponent } from './deposito/deposito.component';
import { HomeComponent } from './home.component';
import { InicialComponent } from './inicial/inicial.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent,
    children: [
      { path: '', component: InicialComponent },
      { path: 'login', component: LoginComponent },
      { path: 'cadastro', component: CadastroComponent },
      { path: 'bem-vindo', component: BemVindoComponent },
      { path: 'deposito', component: DepositoComponent },
      { path: 'confirmacao-deposito', component: ConfirmarComponent },
      { path: 'deposito-realizado', component: ConfirmadoComponent },
      { path: 'consulta-cliente', component: ClienteComponent },
      { path: 'consulta-cliente-informacoes', component: InformacoesClienteComponent },
      { path: 'consulta-conta', component: ContaComponent },
      { path: 'consulta-conta-informacoes', component: InformacoesContaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
