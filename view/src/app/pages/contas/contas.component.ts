import { Component, OnInit } from '@angular/core';
import { Conta } from 'src/app/models/conta.model';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  constructor(private contasService: ContasService) { }

  ngOnInit(): void {
  }

}
