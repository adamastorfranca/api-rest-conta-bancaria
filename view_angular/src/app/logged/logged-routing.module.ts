import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedComponent } from './logged.component';
import { InicialComponent } from './inicio/inicial.component';
import { DepositoLoggedComponent } from './transacoes/deposito/deposito-logged.component';
import { ConfirmarDepositoComponent } from './transacoes/deposito/confirmar-deposito/confirmar-deposito.component';
import { DepositoConfirmadoComponent } from './transacoes/deposito/confirmar-deposito/deposito-confirmado/deposito-confirmado.component';
import { AgenciaNumeroComponent } from './consulta/contas/agencia-numero/agencia-numero.component';
import { InformacoesConsultaComponent } from './consulta/informacoes-consulta/informacoes-consulta.component';
import { PorCpfComponent } from './consulta/cliente/por-cpf/por-cpf.component';
import { SaqueComponent } from './transacoes/saque/saque.component';


const routes: Routes = [
  {
    path: '', component: LoggedComponent,
    children: [
      { path: '', component: InicialComponent },

      { path: 'deposito', component: DepositoLoggedComponent },
      { path: 'confirmar-deposito', component: ConfirmarDepositoComponent },
      { path: 'deposito-confirmado', component: DepositoConfirmadoComponent },

      { path: 'saque', component: SaqueComponent },

      { path: 'informacoes-conta', component: InformacoesConsultaComponent },
      { path: 'consulta-cliente-cpf', component: PorCpfComponent },
      { path: 'consulta-conta-agencia-numero', component: AgenciaNumeroComponent },




    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
