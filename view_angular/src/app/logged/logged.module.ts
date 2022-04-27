import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { LoggedComponent } from './logged.component';
import { DepositoComponent } from './deposito/deposito.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoggedComponent,
    DepositoComponent,
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
