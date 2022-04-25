import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasComponent } from './contas/contas.component';
import { LoggedComponent } from './logged.component';

const routes: Routes = [
  {
    path: '', component: LoggedComponent,
    children: [
      { path: 'contas', component: ContasComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
