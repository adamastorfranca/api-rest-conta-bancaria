package br.com.adamastor.banco.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.com.adamastor.banco.model.entity.Cliente;

public interface ClienteRepository extends CrudRepository<Cliente, Long>{
	
	List<Cliente> findAll();
	Optional<Cliente> findByCpf(String cpf);
	List<Cliente> findByNomeContains(String nome);
	Optional<Cliente> findByEmail(String email);
	List<Cliente> findByTemContaFalse();
	

}
