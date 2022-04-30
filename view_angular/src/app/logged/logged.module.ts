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
import { PeriodoEspecificoComponent } from './extratos/periodo-especifico/periodo-especifico.component';
import { ListaPeriodoComponent } from './extratos/periodo-especifico/lista-periodo/lista-periodo.component';
import { ListarTodosComponent } from './consultas/clientes/listar-todos/listar-todos.component';
import { ClientesComponent } from './cadastros/clientes/clientes.component';
import { ContasComponent } from './cadastros/contas/contas.component';
import { ListarTodasComponent } from './consultas/contas/listar-todas/listar-todas.component';
import { FilterNomeCliente } from './consultas/clientes/listar-todos/filter.pipe';
import { FilterCpf } from './consultas/contas/listar-todas/filter.pipe';
import { SemContaComponent } from './cadastros/contas/sem-conta/sem-conta.component';
import { EdicaoComponent } from './cadastros/contas/edicao/edicao.component';
import { AbrirComponent } from './cadastros/contas/sem-conta/abrir/abrir.component';
import { EditarComponent } from './conta/editar/editar.component';
import { DadosComponent } from './conta/dados/dados.component';

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
    PeriodoEspecificoComponent,
    ListaPeriodoComponent,
    ListarTodosComponent,
    ClientesComponent,
    FilterNomeCliente,
    ContasComponent,
    ListarTodasComponent,
    FilterCpf,
    SemContaComponent,
    EdicaoComponent,
    AbrirComponent,
    EditarComponent,
    DadosComponent
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
