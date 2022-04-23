package br.com.adamastor.banco.model.form;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import lombok.Data;

@Data
public class LoginForm {
	
	private String agencia;
	private String numeroConta;
	private String senha;
	
	public UsernamePasswordAuthenticationToken converter() {
		String login =  agencia + numeroConta;
		return new UsernamePasswordAuthenticationToken(login, senha);
	}

}
