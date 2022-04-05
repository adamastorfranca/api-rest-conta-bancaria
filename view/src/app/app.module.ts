import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
import { HeaderComponent } from './components/header/header.component';
import { ContasComponent } from './pages/contas/contas.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    TransferenciaComponent,
    HeaderComponent,
    ContasComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
