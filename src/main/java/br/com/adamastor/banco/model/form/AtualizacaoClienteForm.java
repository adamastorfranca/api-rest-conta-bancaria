package br.com.adamastor.banco.model.form;

import java.time.LocalDate;

import lombok.Data;

@Data
public class AtualizacaoClienteForm {

	private String nome;

	private String email;
	
	private String telefone;
	
	private String cpf;
	
	private LocalDate dataNascimento;

}
