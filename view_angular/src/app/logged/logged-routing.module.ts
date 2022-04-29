import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { PeriodoEspecificoComponent } from './extratos/periodo-especifico/periodo-especifico.component';
import { ListaPeriodoComponent } from './extratos/periodo-especifico/lista-periodo/lista-periodo.component';
import { ListarTodosComponent } from './consultas/clientes/listar-todos/listar-todos.component';
import { ClientesComponent } from './cadastros/clientes/clientes.component';


const routes: Routes = [
  {
    path: '', component: LoggedComponent,
    children: [
      { path: '', component: InicialComponent },

      { path: 'deposito', component: DepositoLoggedComponent },
      { path: 'confirmar-deposito', component: ConfirmarDepositoComponent },
      { path: 'deposito-confirmado', component: DepositoConfirmadoComponent },

      { path: 'saque', component: SaqueComponent },
      { path: 'saque-realizado', component: ConfirmadoComponent },

      { path: 'transferencia', component: TransferenciaComponent },
      { path: 'confirmar-transferencia', component: ConfirmacaoComponent },
      { path: 'transferencia-realizada', component: ConfirmadaComponent },

      { path: 'consulta-cliente-cpf', component: PorCpfComponent },
      { path: 'clientes', component: ListarTodosComponent },
      { path: 'consulta-conta-agencia-numero', component: AgenciaNumeroComponent },
      { path: 'informacoes-conta', component: InformacoesConsultaComponent },

      { path: 'extratos', component: ExtratosComponent },
      { path: 'extrato-todo-periodo', component: TodoPeriodoComponent },
      { path: 'extrato-por-mes-ano', component: PorMesAnoComponent },
      { path: 'transacoes-por-mes-ano', component: ListaComponent },
      { path: 'extrato-por-periodo-especifico', component: PeriodoEspecificoComponent },
      { path: 'transacoes-periodo-especifico', component: ListaPeriodoComponent },

      { path: 'cadastro-cliente', component: ClientesComponent },
      { path: 'edicao-cliente/:id', component: ClientesComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
