package br.com.adamastor.banco.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import br.com.adamastor.banco.model.entity.Cliente;
import br.com.adamastor.banco.model.entity.ContaBancaria;

public interface ContaBancariaRepository extends CrudRepository<ContaBancaria, Long>{
	
	@Query(value = "SELECT MAX(id) AS id FROM contas", nativeQuery = true)
	Long buscarUltimo();
	List<ContaBancaria> findAll();
	List<ContaBancaria> findByCliente(Cliente cliente);
	Optional<ContaBancaria> findByNumeroConta(String numeroConta);
	Optional<ContaBancaria> findByAgenciaAndNumeroConta(String agencia, String numero);
}
