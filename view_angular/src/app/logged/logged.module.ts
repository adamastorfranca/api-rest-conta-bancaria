import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { LoggedComponent } from './logged.component';
import { ContasComponent } from './contas/contas.component';

@NgModule({
  declarations: [
    LoggedComponent,
    ContasComponent,

  ],
  imports: [
    CommonModule,
    LoggedRoutingModule
  ]
})
export class LoggedModule { }
