package br.com.adamastor.banco.model.form;

import lombok.Data;

@Data
public class AtualizacaoContaForm {

	private Long id;
	
	private String agencia;
	
	private String numero;

	private String senha;

	private String senhaConfirmar;
	
}
