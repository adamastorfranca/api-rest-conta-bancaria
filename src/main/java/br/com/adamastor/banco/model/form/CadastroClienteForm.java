package br.com.adamastor.banco.model.form;

import br.com.adamastor.banco.model.entity.Cliente;
import lombok.Data;

@Data
public class CadastroClienteForm {

	private String nome;
	
	private String cpf;
	
	private String email;
	
	private String telefone;
	
	private String observacoes;

	public Cliente criarCliente() {
		return new Cliente(nome, cpf, email, telefone, observacoes);
	}
	
}
