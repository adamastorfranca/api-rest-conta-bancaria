package br.com.adamastor.banco.model.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import br.com.adamastor.banco.model.entity.ContaBancaria;
import lombok.Data;

@Data
public class ContaBancariaEdicaoDTO {
	
	private Long id;
	
	private String agencia;
	
	private String numero;
	
	private String senha;
	
	private String senhaConfirmar;
	
	private Long idCliente;

	private String nomeCliente;
	
	private String cpf;
	
	private String email;
	
	private String telefone;
	
	private LocalDate dataNascimento;
	
	public ContaBancariaEdicaoDTO(ContaBancaria conta) {
		this.id = conta.getId();
		this.agencia = conta.getAgencia();
		this.numero = conta.getNumeroConta();
		this.senha = "Aa123456";
		this.senhaConfirmar = "Aa123456";
		this.idCliente = conta.getCliente().getId();
		this.nomeCliente = conta.getCliente().getNome();
		this.cpf = conta.getCliente().getCpf();
		this.email = conta.getCliente().getEmail();
		this.telefone = conta.getCliente().getTelefone();
		this.dataNascimento = conta.getCliente().getDataNascimento();
	}
	
	public static List<ContaBancariaEdicaoDTO> converter(List<ContaBancaria> contas){
		return contas.stream().map(ContaBancariaEdicaoDTO::new).collect(Collectors.toList());
	}

}
