import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'view';
  transferencia: any;
  erro: string;

  transferir($event){
    this.transferencia = $event;
  }

  exibirModalErro($event){
    this.erro = $event;
  }
}
