package br.com.adamastor.banco.model.form;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import lombok.Data;

@Data
public class LoginForm {
	
	private String agencia;
	private String numeroConta;
	private String senha;
	
	public UsernamePasswordAuthenticationToken converter() {
		return new UsernamePasswordAuthenticationToken(numeroConta, senha);
	}

}
