package br.com.adamastor.banco.model.exception;

public enum ExceptionValidacoes {

	ERRO_SALDO_INSUFICIENTE("A conta não possiu saldo suficiente para realizar a operação!"),
	ERRO_VALOR_INVALIDO("O valor da operação deve ser maior que zero!"),
	ALERTA_NENHUM_REGISTRO_ENCONTRADO("Nenhum registro foi encontrado no banco de dados!"), 
	ERRO_CPF_JA_CADASTRADO("Já existe um cliente cadastrado com esse CPF!"), 
	ERRO_EMAIL_JA_CADASTRADO("Já existe um cliente cadastrado com esse e-mail!"), 
	ERRO_SENHAS_NAO_CORRESPONDEM("As senhas informadas não correspondem!"),
	ERRO_CPF_NAO_CADASTRADO("Nenhum cliente com este CPF cadastrado!"),
	ERRO_CPF_INVALIDO("CPF informado não existe!"), 
	ERRO_AUTORIZACAO_NAO_CADASTRADA("Não tem autorizações com este nome!"); 
	
	
	private ExceptionValidacoes(String mensagem) {}
	
	
	
}
