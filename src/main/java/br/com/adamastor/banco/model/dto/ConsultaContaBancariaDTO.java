package br.com.adamastor.banco.model.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class ConsultaContaBancariaDTO implements Serializable{

	private static final long serialVersionUID = 3557961199090274368L;

	private String agencia;
	
	private String numero;
	
	private double saldo;
	
	private String cpf;
	
	private String nomeTitular;

}