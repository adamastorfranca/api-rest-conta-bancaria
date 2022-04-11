package br.com.adamastor.banco.model.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import br.com.adamastor.banco.model.entity.ContaBancaria;
import lombok.Data;

@Data
public class ContaBancariaDTO {
	
	private String agencia;
	
	private String numero;

	private String nomeCliente;
	
	private String cpf;
	
	private String email;
	
	private String telefone;
	
	private LocalDate dataNascimento;
	
	public ContaBancariaDTO(ContaBancaria conta) {
		this.agencia = conta.getAgencia();
		this.numero = conta.getNumeroConta();
		this.nomeCliente = conta.getCliente().getNome();
		this.cpf = conta.getCliente().getCpf();
		this.email =  conta.getCliente().getEmail();
		this.telefone = conta.getCliente().getTelefone();
		this.dataNascimento =  conta.getCliente().getDataNascimento();
	}
	
	public static List<ContaBancariaDTO> converter(List<ContaBancaria> contas){
		return contas.stream().map(ContaBancariaDTO::new).collect(Collectors.toList());
	}

}
