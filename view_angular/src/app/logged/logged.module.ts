import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { LoggedComponent } from './logged.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InicialComponent } from './inicial/inicial.component';
import { DepositoLoggedComponent } from './deposito-logged/deposito-logged.component';
import { ConfirmarDepositoComponent } from './deposito-logged/confirmar-deposito/confirmar-deposito.component';
import { DepositoConfirmadoComponent } from './deposito-logged/confirmar-deposito/deposito-confirmado/deposito-confirmado.component';
import { ConsultaLoggedComponent } from './consulta-logged/consulta-logged.component';

@NgModule({
  declarations: [
    LoggedComponent,
    InicialComponent,
    DepositoLoggedComponent,
    ConfirmarDepositoComponent,
    DepositoConfirmadoComponent,
    ConsultaLoggedComponent,
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
