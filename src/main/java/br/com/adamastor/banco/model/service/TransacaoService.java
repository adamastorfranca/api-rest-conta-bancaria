package br.com.adamastor.banco.model.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.adamastor.banco.model.dto.TransacaoDTO;
import br.com.adamastor.banco.model.entity.ContaBancaria;
import br.com.adamastor.banco.model.entity.TipoTransacao;
import br.com.adamastor.banco.model.entity.Transacao;
import br.com.adamastor.banco.model.exception.AplicacaoException;
import br.com.adamastor.banco.model.exception.ExceptionValidacoes;
import br.com.adamastor.banco.model.repository.TransacaoRepository;

@Service
public class TransacaoService {
	
	@Autowired
	private TransacaoRepository transacaoRepository;
	
	public void salvar(TipoTransacao tipo, double valor, ContaBancaria origem, ContaBancaria destino) {
		Transacao transacao = new Transacao();
		
		if (valor <= 0) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_VALOR_INVALIDO);
		}
		
		transacao.setTipo(tipo);
		transacao.setValor(valor);
		transacao.setOrigem(origem);
		transacao.setDestino(destino);
		
		if (origem != null) {
			transacao.setSaldoAposContaOrigem(origem.getSaldo());
		}
		if (destino != null) {
			transacao.setSaldoAposContaDestino(destino.getSaldo());
		}
		
		transacaoRepository.save(transacao);
	}
	
	public static TransacaoDTO criarTransacaoDTO(Transacao transacao, ContaBancaria contaSolicitadora) {
		TransacaoDTO dto = new TransacaoDTO();
		
		dto.setDataHora(transacao.getDataHora().format(DateTimeFormatter.ofPattern("dd/MM/yy HH:mm")));
		dto.setValor(transacao.getValor());
		dto.setTipo(transacao.getTipo());
		
		if (transacao.getTipo().equals(TipoTransacao.DEPOSITO)) {
			dto.setSaldoApos(transacao.getSaldoAposContaDestino());
			dto.setAgenciaDestino(transacao.getDestino().getAgencia());
			dto.setNumeroDestino(transacao.getDestino().getNumeroConta());
		}
		if (transacao.getTipo().equals(TipoTransacao.SAQUE)) {
			dto.setSaldoApos(transacao.getSaldoAposContaOrigem());
			dto.setAgenciaOrigem(transacao.getOrigem().getAgencia());
			dto.setNumeroOrigem(transacao.getOrigem().getNumeroConta());
		}
		if (transacao.getTipo().equals(TipoTransacao.TRANSFERENCIA)) {
			dto.setAgenciaOrigem(transacao.getOrigem().getAgencia());
			dto.setNumeroOrigem(transacao.getOrigem().getNumeroConta());
			dto.setAgenciaDestino(transacao.getDestino().getAgencia());
			dto.setNumeroDestino(transacao.getDestino().getNumeroConta());
			
			if (contaSolicitadora == transacao.getOrigem()) {
				dto.setTipo(TipoTransacao.TRANSFERENCIA_ENVIADA);
				dto.setSaldoApos(transacao.getSaldoAposContaOrigem());			
			} else {
				dto.setTipo(TipoTransacao.TRANSFERENCIA_RECEBIDA);
				dto.setSaldoApos(transacao.getSaldoAposContaDestino());
			}
		} 	
		return dto;
	}

	public List<TransacaoDTO> converterEmListaExtratoDTO(List<Transacao> transacoes, ContaBancaria contaSolicitadora){
		List<TransacaoDTO> dto = new ArrayList<>();
		transacoes.forEach(t ->  dto.add(criarTransacaoDTO(t, contaSolicitadora)));
		return dto;
	}

	
//	public List<TransacaoDTO> consultarExtrato(String agencia, String numero){
//		ContaBancaria contaSolicitadora = contaBancariaService.consultarConta(agencia, numero);	
//		List<Transacao> transacoesDaConta = transacaoRepository.buscarTransacoesPorConta(contaSolicitadora);
//	
//		if (transacoesDaConta == null || transacoesDaConta.isEmpty()) {
//			throw new AplicacaoException(ExceptionValidacoes.ALERTA_NENHUM_REGISTRO_ENCONTRADO);
//		}
//		
//		return converterEmListaExtratoDTO(transacoesDaConta, contaSolicitadora);
//	}
//
//	public List<TransacaoDTO> obterExtratoPorMesAno(String agencia, String numero, int mes, int ano){
//		ContaBancaria contaSolicitadora = contaBancariaService.consultarConta(agencia, numero);
//		LocalDateTime inicioPeriodo = LocalDateTime.of(ano, mes, 1, 0, 0, 00);
//		LocalDateTime finalPeriodo = LocalDateTime.of(ano, mes, Month.of(mes).maxLength(), 23, 59, 59);
//		List<Transacao> transacoesDoPeriodo = transacaoRepository.buscarTransacoesPorPeriodo(contaSolicitadora, inicioPeriodo, finalPeriodo);
//
//		if (transacoesDoPeriodo == null || transacoesDoPeriodo.isEmpty()) {
//			throw new AplicacaoException(ExceptionValidacoes.ALERTA_NENHUM_REGISTRO_ENCONTRADO);
//		}
//		
//		return converterEmListaExtratoDTO(transacoesDoPeriodo, contaSolicitadora);
//	}
//	
//	public List<TransacaoDTO> obterExtratoPorPeriodoEspecifico(ConsultaExtratoPeriodoDTO form){
//		ContaBancaria contaSolicitadora = contaBancariaService.consultarConta(form.getAgencia(), form.getNumeroConta());
//		LocalDateTime inicioPeriodo = LocalDateTime.of(form.getAnoInicio(), form.getMesInicio(), form.getDiaInicio(), 0, 0, 0);
//		LocalDateTime finalPeriodo = LocalDateTime.of(form.getAnoFinal(), form.getMesFinal(), form.getDiaFinal(), 23, 59, 59);
//		List<Transacao> transacoesDoPeriodo = transacaoRepository.buscarTransacoesPorPeriodo(contaSolicitadora, inicioPeriodo, finalPeriodo);
//		
//		if (transacoesDoPeriodo == null || transacoesDoPeriodo.isEmpty()) {
//			throw new AplicacaoException(ExceptionValidacoes.ALERTA_NENHUM_REGISTRO_ENCONTRADO);
//		}
//		
//		return converterEmListaExtratoDTO(transacoesDoPeriodo, contaSolicitadora);
//	}
//	
//	
//	

}
