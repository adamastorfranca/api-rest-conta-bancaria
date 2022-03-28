package br.com.adamastor.banco.model.form;

import br.com.adamastor.banco.model.entity.ContaBancaria;
import lombok.Data;

@Data
public class CadastroContaForm {

	private String cpf;

	private String agencia;
	
	private String numero;
	
	public ContaBancaria criarConta() {
		return new ContaBancaria(agencia, numero);
	}
}
