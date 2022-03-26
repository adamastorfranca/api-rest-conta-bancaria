package br.com.adamastor.banco.model.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class DepositoDTO implements Serializable{

	private static final long serialVersionUID = -1492957514362231264L;
	
	private String agencia;
	private String numeroConta;
	private double valor;
	
}