package br.com.adamastor.banco.model.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.com.adamastor.banco.model.entity.Autorizacao;

public interface AutorizacaoRepository extends CrudRepository<Autorizacao, Long>{
	
	Optional<Autorizacao> findByNomeAutorizacao(String nomeAutorizacao);
	

}
