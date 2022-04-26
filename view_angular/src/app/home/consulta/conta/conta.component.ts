import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  formConsultaConta: FormGroup = new FormGroup({
    agencia: new FormControl('', [Validators.required]),
    numeroConta: new FormControl('', [Validators.required])
  })

  constructor(
    private contaService: ContasService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  consulta(): void {
    if (this.formConsultaConta.valid){
      const agencia: string = this.formConsultaConta.get('agencia')?.value;
      const numeroConta: string = this.formConsultaConta.get('numeroConta')?.value;

      this.contaService.buscarInformacoes(agencia, numeroConta).subscribe((result) => {
        this.contaService.temp.agencia = result.agencia;
        this.contaService.temp.numero = result.numero;
        this.contaService.temp.nomeCliente = result.nomeCliente;
        this.router.navigate(['consulta-conta-informacoes']);
      });
    }
  }
}
