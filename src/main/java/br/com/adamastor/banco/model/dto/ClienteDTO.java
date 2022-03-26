package br.com.adamastor.banco.model.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.com.adamastor.banco.model.entity.Cliente;
import lombok.Data;

@Data
public class ClienteDTO {

	private String nome;
	
	private String email;

	public ClienteDTO(Cliente c) {
		this.nome = c.getNome();
		this.email = c.getEmail();
	}

	public static List<ClienteDTO> converter(List<Cliente> clientes) {
		return clientes.stream().map(ClienteDTO::new).collect(Collectors.toList());
	}
}
