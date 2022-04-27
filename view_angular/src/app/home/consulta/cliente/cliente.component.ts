import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  formConsultaCliente: FormGroup = new FormGroup({
    cpf: new FormControl('', [Validators.required]),
  })

  constructor(
    private contaService: ContasService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  consulta(): void {
    if (this.formConsultaCliente.valid){
      const cpf: string = this.formConsultaCliente.get('cpf')?.value;
      this.contaService.buscarPorCpf(cpf).subscribe((result) => {
        this.contaService.temp.agencia = result.agencia;
        this.contaService.temp.numero = result.numero;
        this.contaService.temp.nomeCliente = result.nomeCliente;
        this.router.navigate(['consulta-cliente-informacoes']);
      },
      (error) => {
        alert('CPF informado não está cadastrado');
        console.error(error);
        this.formConsultaCliente.reset();
      });
    }
  }

}
