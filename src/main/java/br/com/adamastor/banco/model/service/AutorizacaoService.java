package br.com.adamastor.banco.model.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.adamastor.banco.model.entity.Autorizacao;
import br.com.adamastor.banco.model.exception.AplicacaoException;
import br.com.adamastor.banco.model.exception.ExceptionValidacoes;
import br.com.adamastor.banco.model.repository.AutorizacaoRepository;

@Service
public class AutorizacaoService {

	@Autowired
	private AutorizacaoRepository autorizacaoRepository;

	public Autorizacao buscar(String nomeAutorizacao) {
		Optional<Autorizacao> resultado = autorizacaoRepository.findByNomeAutorizacao(nomeAutorizacao);
		if (!resultado.isPresent()) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_AUTORIZACAO_NAO_CADASTRADA);
		}
		return resultado.get();
	}
}
