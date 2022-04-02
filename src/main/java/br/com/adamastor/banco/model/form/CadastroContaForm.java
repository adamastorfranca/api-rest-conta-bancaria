package br.com.adamastor.banco.model.form;

import br.com.adamastor.banco.model.entity.ContaBancaria;
import lombok.Data;

@Data
public class CadastroContaForm {

	private String cpf;

	private String agencia;
	
	private String numero;
	
	public ContaBancaria criarConta() {
		ContaBancaria conta = new ContaBancaria();
		conta.setAgencia(agencia);
		conta.setNumero(numero);
		return conta;
	}
}
