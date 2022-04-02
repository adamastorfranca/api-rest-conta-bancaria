package br.com.adamastor.banco.model.dto;

import br.com.adamastor.banco.model.entity.TipoTransacao;
import lombok.Data;

@Data
public class TransacaoDTO {

	private String dataHora;

	private TipoTransacao tipo;

	private double valor;

	private double saldoApos;

	private String agenciaOrigem;

	private String numeroOrigem;

	private String agenciaDestino;

	private String numeroDestino;

}
