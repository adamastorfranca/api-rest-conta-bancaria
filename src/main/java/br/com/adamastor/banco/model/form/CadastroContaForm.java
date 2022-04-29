package br.com.adamastor.banco.model.form;

import java.time.LocalDate;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import br.com.adamastor.banco.model.entity.Cliente;
import lombok.Data;

@Data
public class CadastroContaForm {

	@NotNull @NotEmpty
	private String nome;
	@Size(min = 11, max = 11)
	private String cpf;
	@NotNull @NotEmpty
	private String email;
	@NotNull @NotEmpty
	private String telefone;
	@NotNull @NotEmpty
	private LocalDate dataNascimento;
	@NotNull @NotEmpty
	private String senha;
	@NotNull @NotEmpty
	private String senhaConfirmar;
	
	public Cliente criarCliente() {
		Cliente c = new Cliente();
		c.setNome(nome);
		c.setCpf(cpf);
		c.setTelefone(telefone);
		c.setDataNascimento(dataNascimento);
		c.setEmail(email);	
		return c;
	}
}
