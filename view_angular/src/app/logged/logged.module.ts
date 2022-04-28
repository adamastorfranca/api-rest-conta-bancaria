import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoggedRoutingModule } from './logged-routing.module';
import { LoggedComponent } from './logged.component';
import { InicialComponent } from './inicio/inicial.component';
import { DepositoLoggedComponent } from './transacoes/deposito/deposito-logged.component';
import { ConfirmarDepositoComponent } from './transacoes/deposito/confirmar-deposito/confirmar-deposito.component';
import { DepositoConfirmadoComponent } from './transacoes/deposito/confirmar-deposito/deposito-confirmado/deposito-confirmado.component';
import { AgenciaNumeroComponent } from './consulta/contas/agencia-numero/agencia-numero.component';
import { InformacoesConsultaComponent } from './consulta/informacoes-consulta/informacoes-consulta.component';
import { PorCpfComponent } from './consulta/cliente/por-cpf/por-cpf.component';
import { SaqueComponent } from './transacoes/saque/saque.component';

@NgModule({
  declarations: [
    LoggedComponent,
    InicialComponent,
    DepositoLoggedComponent,
    ConfirmarDepositoComponent,
    DepositoConfirmadoComponent,
    AgenciaNumeroComponent,
    InformacoesConsultaComponent,
    PorCpfComponent,
    SaqueComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LoggedRoutingModule,
  ]
})
export class LoggedModule { }
