import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BemVindoComponent } from './cadastro/bem-vindo/bem-vindo.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ClienteComponent } from './consulta/cliente/cliente.component';
import { ContaComponent } from './consulta/conta/conta.component';
import { InformacoesComponent } from './consulta/conta/informacoes/informacoes.component';
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
      { path: 'consulta-conta', component: ContaComponent },
      { path: 'consulta-conta-informacoes', component: InformacoesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
