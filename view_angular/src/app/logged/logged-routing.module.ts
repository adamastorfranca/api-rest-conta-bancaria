import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositoComponent } from '../home/deposito/deposito.component';
import { LoggedComponent } from './logged.component';

const routes: Routes = [
  {
    path: '', component: LoggedComponent,
    children: [
      { path: 'deposito', component: DepositoComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
