import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ContasComponent } from './pages/contas/contas.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';

const routes: Routes = [
  { path: 'transferencia', component: TransferenciaComponent },
  { path: 'contas', component: ContasComponent},
  { path: 'clientes', component: ClientesComponent},
  { path: 'extrato', component: ExtratoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
