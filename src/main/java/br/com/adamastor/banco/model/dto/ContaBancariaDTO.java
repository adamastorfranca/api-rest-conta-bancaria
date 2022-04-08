package br.com.adamastor.banco.model.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.com.adamastor.banco.model.entity.ContaBancaria;
import lombok.Data;

@Data
public class ContaBancariaDTO {
	
	private String agencia;
	
	private String numero;

	private String nomeCliente;
	
	public ContaBancariaDTO(ContaBancaria conta) {
		this.agencia = conta.getAgencia();
		this.numero = conta.getNumeroConta();
		this.nomeCliente = conta.getCliente().getNome();
	}
	
	public static List<ContaBancariaDTO> converter(List<ContaBancaria> contas){
		return contas.stream().map(ContaBancariaDTO::new).collect(Collectors.toList());
	}

}
