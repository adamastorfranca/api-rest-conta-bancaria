package br.com.adamastor.banco.model.form;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import br.com.adamastor.banco.model.entity.Cliente;
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
	@NotNull @NotEmpty
	private String dataNascimento;
	
	public Cliente criarCliente() {
		Cliente c = new Cliente();
		c.setNome(nome.toUpperCase());
		c.setCpf(cpf);
		c.setTelefone(telefone);
		c.setDataNascimento(LocalDate.parse(dataNascimento, DateTimeFormatter.ofPattern("dd/MM/yyyy")));
		c.setEmail(email);	
		return c;
	}

}
