package br.com.adamastor.banco.model.dto;

import br.com.adamastor.banco.model.entity.ContaBancaria;
import lombok.Data;

@Data
public class ContaBancariaDTO {
	
	private String agencia;

	private String numero;

	private String nomeCliente;
	
	public ContaBancariaDTO(ContaBancaria conta) {
		this.agencia = conta.getAgencia();
		this.numero = conta.getNumero();
		this.nomeCliente = conta.getCliente().getNome();
	}

}
