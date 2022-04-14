package br.com.adamastor.banco.model.dto;

public class TokenDTO {

	private String token;
	private String tipoAutenticacao;

	public TokenDTO(String token, String tipoAutenticacao) {
		this.token = token;
		this.tipoAutenticacao = tipoAutenticacao;	
	}

	public String getToken() {
		return token;
	}

	public String getTipoAutenticacao() {
		return tipoAutenticacao;
	}
	
	

}
