package br.com.adamastor.banco.model.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.com.adamastor.banco.model.entity.Cliente;

public interface ClienteRepository extends CrudRepository<Cliente, Long>{
	
	Cliente findByCpf(String cpf);
	List<Cliente> findByNomeContains(String nome);

}
