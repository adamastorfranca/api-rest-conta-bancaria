import { Component, OnInit } from '@angular/core';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  contas: any[] = [];

  constructor(private contasService: ContasService) { }

  ngOnInit(): void {
    this.listarTodasContas();
  }

  listarTodasContas(){
    this.contasService.listarTodasContas().subscribe((result: any) => {
      this.contas = result;
      console.log(this.contas);
    });
  }
}
