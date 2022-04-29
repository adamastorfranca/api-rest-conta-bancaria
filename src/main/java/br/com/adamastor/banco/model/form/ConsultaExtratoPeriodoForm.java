package br.com.adamastor.banco.model.form;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ConsultaExtratoPeriodoForm {

	String agencia;
	
	String numeroConta;
	
	LocalDate dataInicio;
	
	LocalDate dataFinal;
	
//	int diaInicio;
//	
//	int mesInicio;
//	
//	int anoInicio;
//	
//	int diaFinal;
//	
//	int mesFinal;
//	
//	int anoFinal;
}
