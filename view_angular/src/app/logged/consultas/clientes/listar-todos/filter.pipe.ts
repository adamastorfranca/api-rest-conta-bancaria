import { Pipe, PipeTransform } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';


@Pipe({ name: 'filterNomeCliente'})
export class FilterNomeCliente implements PipeTransform {

    transform(clientes: ICliente[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery
            .trim()
            .toUpperCase();

        if(descriptionQuery) {
            return clientes.filter(cliente =>
                cliente.nome.includes(descriptionQuery)
            );
        } else {
            return clientes;
        }
    }

}
