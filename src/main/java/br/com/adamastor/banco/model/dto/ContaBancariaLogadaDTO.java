package br.com.adamastor.banco.model.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.com.adamastor.banco.model.entity.ContaBancaria;
import lombok.Data;

@Data
public class ContaBancariaLogadaDTO {
	
	private Long id;
	
	private String agencia;
	
	private String numero;
	
	private Long idCliente;

	private String nomeCliente;
	
	private String cpf;
	
	private Double saldo;
	
	public ContaBancariaLogadaDTO(ContaBancaria conta) {
		this.id = conta.getId();
		this.agencia = conta.getAgencia();
		this.numero = conta.getNumeroConta();
		this.idCliente = conta.getCliente().getId();
		this.nomeCliente = conta.getCliente().getNome();
		this.cpf = conta.getCliente().getCpf();
		this.saldo = conta.getSaldo();
	}
	
	public static List<ContaBancariaLogadaDTO> converter(List<ContaBancaria> contas){
		return contas.stream().map(ContaBancariaLogadaDTO::new).collect(Collectors.toList());
	}

}
