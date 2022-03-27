package br.com.adamastor.banco.model.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.com.adamastor.banco.model.entity.Cliente;
import br.com.adamastor.banco.model.entity.ContaBancaria;

public interface ContaBancariaRepository extends CrudRepository<ContaBancaria, Long>{
		
	List<ContaBancaria> findByCliente(Cliente cliente);
	ContaBancaria findByAgenciaAndNumero(String agencia, String numero);
	
}
