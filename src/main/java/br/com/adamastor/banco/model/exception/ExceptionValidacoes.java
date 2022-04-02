package br.com.adamastor.banco.model.exception;

public enum ExceptionValidacoes {

	ERRO_SALDO_INSUFICIENTE("A conta não possiu saldo suficiente para realizar a operação!"),
	ERRO_VALOR_INVALIDO("O valor da operação deve ser maior que zero!"),
	ALERTA_NENHUM_REGISTRO_ENCONTRADO("Nenhum registro foi encontrado no banco de dados!");
	
	private ExceptionValidacoes(String mensagem) {}
	
	
	
}
