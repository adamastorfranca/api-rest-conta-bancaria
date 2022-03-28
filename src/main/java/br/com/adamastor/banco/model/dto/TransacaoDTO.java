package br.com.adamastor.banco.model.dto;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import br.com.adamastor.banco.model.entity.Transacao;
import lombok.Data;

@Data
public class TransacaoDTO {

	private String dataHora;
	
	private String tipo;
	
	private double valor;

	private double saldoApos;
	
	private String agenciaOrigem;
	
	private String numeroOrigem;

	private String agenciaDestino;
	
	private String numeroDestino;	
	
	public TransacaoDTO(Transacao transacao) {
		this.dataHora = transacao.getDataHora().format(DateTimeFormatter.ofPattern("dd/MM/yy HH:mm"));
		this.tipo = transacao.getTipo();
		this.valor = transacao.getValor();
		
		if (transacao.getTipo().equals("DEPÓSITO")) {
			this.agenciaDestino = transacao.getDestino().getAgencia();
			this.numeroDestino = transacao.getDestino().getNumero();
			this.saldoApos = transacao.getSaldoAposContaDestino();
		}
		if (transacao.getTipo().equals("SAQUE")) {
			this.agenciaOrigem = transacao.getOrigem().getAgencia();
			this.numeroOrigem = transacao.getOrigem().getNumero();
			this.saldoApos = transacao.getSaldoAposContaOrigem();
		}
		if(transacao.getTipo().equals("TRANSFERÊNCIA")) {
			this.agenciaOrigem = transacao.getOrigem().getAgencia();
			this.numeroOrigem = transacao.getOrigem().getNumero();
			this.agenciaDestino = transacao.getDestino().getAgencia();
			this.numeroDestino = transacao.getDestino().getNumero();
		}	
	}
	
	public static List<TransacaoDTO> converterEmExtrato(List<Transacao> transacoes){
		return transacoes.stream().map(TransacaoDTO::new).collect(Collectors.toList());
	}
}
