package br.com.adamastor.banco.model.dto;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import br.com.adamastor.banco.model.entity.Transacao;
import lombok.Data;

@Data
public class ExtratoDTO {

	private String dataHora;
	
	private String tipo;
	
	private double valor;
	
	private String agenciaOrigem;
	
	private String numeroOrigem;

	private String agenciaDestino;
	
	private String numeroDestino;
	
	public ExtratoDTO(Transacao transacao) {
		this.dataHora = transacao.getDataHora().format(DateTimeFormatter.ofPattern("dd/MM/yy HH:mm"));
		this.tipo = transacao.getTipo();
		this.valor = transacao.getValor();
		this.agenciaOrigem = transacao.getOrigem().getAgencia();
		this.numeroOrigem = transacao.getOrigem().getNumero();
		
		if(transacao.getDestino() != null) {
			this.agenciaDestino = transacao.getDestino().getAgencia();
			this.numeroDestino = transacao.getDestino().getNumero();
		}
		
	}
	
	public static List<ExtratoDTO> converterEmExtrato(List<Transacao> transacoes){
		return transacoes.stream().map(ExtratoDTO::new).collect(Collectors.toList());
	}
}
