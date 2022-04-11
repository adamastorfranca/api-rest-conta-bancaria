import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDepositoSaque } from 'src/app/interfaces/deposito-saque';
import { ContasService } from 'src/app/services/contas.service';


@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {

  deposito: IDepositoSaque = {
    agencia: '',
    numeroConta: '',
    valor: 0
  }

  formDeposito: FormGroup = new FormGroup({
    agencia: new FormControl('', Validators.required),
    numeroConta: new FormControl('', Validators.required),
    valor: new FormControl(null, Validators.required)
  })

  constructor(private contasService: ContasService) { }

  ngOnInit(): void {
  }

  novoDeposito(){
    const deposito: IDepositoSaque = this.formDeposito.value;
    this.contasService.depositar(deposito).subscribe(result => {
      console.log(result)
    });
  }

}
