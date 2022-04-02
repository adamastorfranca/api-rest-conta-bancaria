package br.com.adamastor.banco.model.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class CadastroClienteForm {

	@NotNull @NotEmpty
	private String nome;
	@Size(min = 11, max = 11)
	private String cpf;
	@NotNull @NotEmpty
	private String email;
	@NotNull @NotEmpty
	private String telefone;
	
	private String observacoes;

}
