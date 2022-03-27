package br.com.adamastor.banco.model.dto;

import lombok.Data;

@Data
public class ConsultaExtratoPeriodoDTO {

	String agencia;
	
	String numero;
	
	int diaInicio;
	
	int mesInicio;
	
	int anoInicio;
	
	int diaFinal;
	
	int mesFinal;
	
	int anoFinal;
}
