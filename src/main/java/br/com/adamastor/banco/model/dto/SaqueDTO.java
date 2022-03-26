package br.com.adamastor.banco.model.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class SaqueDTO implements Serializable{

	private static final long serialVersionUID = -6818101389807806377L;
	
	private String agencia;
	private String numeroConta;
	private double valor;
	
}

