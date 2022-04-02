package br.com.adamastor.banco.model.exception;

public class AplicacaoException extends RuntimeException{

	private static final long serialVersionUID = -3024733184303491610L;
	
	public AplicacaoException(ExceptionValidacoes exception) {
		super(exception.toString());
	}

}
