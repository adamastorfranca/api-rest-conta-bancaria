import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmarDepositoComponent } from './deposito-logged/confirmar-deposito/confirmar-deposito.component';
import { DepositoConfirmadoComponent } from './deposito-logged/confirmar-deposito/deposito-confirmado/deposito-confirmado.component';

import { DepositoLoggedComponent } from './deposito-logged/deposito-logged.component';
import { InicialComponent } from './inicial/inicial.component';
import { LoggedComponent } from './logged.component';

const routes: Routes = [
  {
    path: '', component: LoggedComponent,
    children: [
      { path: '', component: InicialComponent },
      { path: 'deposito', component: DepositoLoggedComponent },
      { path: 'confirmar-deposito', component: ConfirmarDepositoComponent },
      { path: 'deposito-confirmado', component: DepositoConfirmadoComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
