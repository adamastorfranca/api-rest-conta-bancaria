import { Pipe, PipeTransform } from '@angular/core';
import { ICadastro } from 'src/app/interfaces/cadastro';
import { ICliente } from 'src/app/interfaces/cliente';


@Pipe({ name: 'filterCpf'})
export class FilterCpf implements PipeTransform {

    transform(contas: ICadastro[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery
            .trim()
            .toUpperCase();

        if(descriptionQuery) {
            return contas.filter(conta =>
                conta.cpf.includes(descriptionQuery)
            );
        } else {
            return contas;
        }
    }

}
