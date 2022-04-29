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
import { AgenciaNumeroComponent } from './consultas/contas/agencia-numero/agencia-numero.component';
import { InformacoesConsultaComponent } from './consultas/informacoes-consultas/informacoes-consulta.component';
import { PorCpfComponent } from './consultas/clientes/por-cpf/por-cpf.component';
import { SaqueComponent } from './transacoes/saque/saque.component';
import { ConfirmadoComponent } from './transacoes/saque/confirmado/confirmado.component';
import { TransferenciaComponent } from './transacoes/transferencia/transferencia.component';
import { ConfirmacaoComponent } from './transacoes/transferencia/confirmacao/confirmacao.component';
import { ConfirmadaComponent } from './transacoes/transferencia/confirmacao/confirmada/confirmada.component';
import { ExtratosComponent } from './extratos/extratos.component';
import { TodoPeriodoComponent } from './extratos/todo-periodo/todo-periodo.component';
import { PorMesAnoComponent } from './extratos/por-mes-ano/por-mes-ano.component';
import { ListaComponent } from './extratos/por-mes-ano/lista/lista.component';

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
    ConfirmadoComponent,
    TransferenciaComponent,
    ConfirmacaoComponent,
    ConfirmadaComponent,
    ExtratosComponent,
    TodoPeriodoComponent,
    PorMesAnoComponent,
    ListaComponent,
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
