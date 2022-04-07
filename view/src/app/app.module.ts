import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContasComponent } from './pages/contas/contas.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HeaderLogadoComponent } from './components/header-logado/header-logado.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import  localePt  from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    TransferenciaComponent,
    InicioComponent,
    ContasComponent,
    ClientesComponent,
    HeaderLogadoComponent,
    ExtratoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
