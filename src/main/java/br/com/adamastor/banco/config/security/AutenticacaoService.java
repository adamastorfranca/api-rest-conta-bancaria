package br.com.adamastor.banco.config.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.adamastor.banco.model.entity.ContaBancaria;
import br.com.adamastor.banco.model.repository.ContaBancariaRepository;

@Service
public class AutenticacaoService implements UserDetailsService {

	@Autowired
	ContaBancariaRepository contaBancariaRepository;
	
	@Override
	public UserDetails loadUserByUsername(String numeroConta) throws UsernameNotFoundException {
		Optional<ContaBancaria> resultado = contaBancariaRepository.findByNumeroConta(numeroConta);
		if (resultado.isPresent()) {
			return resultado.get();
		}
		
		throw new UsernameNotFoundException("Dados inválidados");
	}
	
	

}
