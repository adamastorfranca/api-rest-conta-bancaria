package br.com.adamastor.banco.model.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import br.com.adamastor.banco.model.entity.Cliente;
import lombok.Data;

@Data
public class ClienteDTO {

	private Long id;
	
	private String nome;
	
	private String cpf;
	
	private String email;
	
	private String telefone;
	
	private LocalDate dataNascimento;
	
	private Boolean temConta;

	public ClienteDTO(Cliente c) {
		this.id = c.getId();
		this.nome = c.getNome();
		this.cpf = c.getCpf();
		this.email = c.getEmail();
		this.telefone = c.getTelefone();
		this.dataNascimento = c.getDataNascimento();
		this.temConta = c.getTemConta();
	}

	public static List<ClienteDTO> converter(List<Cliente> clientes) {
		return clientes.stream().map(ClienteDTO::new).collect(Collectors.toList());
	}
}
