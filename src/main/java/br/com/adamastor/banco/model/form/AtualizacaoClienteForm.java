package br.com.adamastor.banco.model.form;

import lombok.Data;

@Data
public class AtualizacaoClienteForm {

	private String cpf;
	
	private String nome;

	private String email;
	
	private String telefone;
	
	private boolean ativo;
	
	private String observacoes;


}
