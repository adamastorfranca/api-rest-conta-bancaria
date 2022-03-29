package br.com.adamastor.banco.model.dto;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import br.com.adamastor.banco.model.entity.ContaBancaria;
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

	public TransacaoDTO(Transacao transacao, ContaBancaria contaSolicitadora) {
		this.dataHora = transacao.getDataHora().format(DateTimeFormatter.ofPattern("dd/MM/yy HH:mm"));
		this.valor = transacao.getValor();
		this.tipo = transacao.getTipo();

		if (transacao.getTipo().equals("DEPÓSITO")) {
			this.saldoApos = transacao.getSaldoAposContaDestino();
			this.agenciaDestino = transacao.getDestino().getAgencia();
			this.numeroDestino = transacao.getDestino().getNumero();
		}
		if (transacao.getTipo().equals("SAQUE")) {
			this.saldoApos = transacao.getSaldoAposContaOrigem();
			this.agenciaOrigem = transacao.getOrigem().getAgencia();
			this.numeroOrigem = transacao.getOrigem().getNumero();
		}
		if (transacao.getTipo().equals("TRANSFERÊNCIA")) {
			this.agenciaOrigem = transacao.getOrigem().getAgencia();
			this.numeroOrigem = transacao.getOrigem().getNumero();
			this.agenciaDestino = transacao.getDestino().getAgencia();
			this.numeroDestino = transacao.getDestino().getNumero();
			
			if (contaSolicitadora == transacao.getOrigem()) {
				this.tipo = "TRANSFERÊNCIA ENVIADA";
				this.saldoApos = transacao.getSaldoAposContaOrigem();			
			} else {
				this.tipo = "TRANSFERÊNCIA RECEBIDA";
				this.saldoApos = transacao.getSaldoAposContaDestino();
			}
		} 
	}
	
	public static List<TransacaoDTO> converterEmListaExtratoDTO(List<Transacao> transacoes, ContaBancaria contaSolicitadora){
		List<TransacaoDTO> transacoesDTO = new ArrayList<>();
		for (Transacao t : transacoes) {
			transacoesDTO.add(new TransacaoDTO(t, contaSolicitadora));
		}
		return transacoesDTO;
	}

}
