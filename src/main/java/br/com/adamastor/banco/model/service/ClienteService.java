package br.com.adamastor.banco.model.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.adamastor.banco.model.dto.ClienteDTO;
import br.com.adamastor.banco.model.entity.Cliente;
import br.com.adamastor.banco.model.exception.AplicacaoException;
import br.com.adamastor.banco.model.exception.ExceptionValidacoes;
import br.com.adamastor.banco.model.form.AtualizacaoClienteForm;
import br.com.adamastor.banco.model.form.CadastroClienteForm;
import br.com.adamastor.banco.model.repository.ClienteRepository;
import br.com.adamastor.banco.model.util.CpfUtil;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;
	
	public List<ClienteDTO> buscarTodosClientes() {
		return ClienteDTO.converter(clienteRepository.findAll());
	}
	
	@Transactional(rollbackFor = Exception.class)
	public Cliente cadastrar(CadastroClienteForm form) {
		Optional<Cliente> resultado1 = clienteRepository.findByCpf(form.getCpf());
		if (resultado1.isPresent()){
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_JA_CADASTRADO);
		}
		if (!CpfUtil.validaCPF(form.getCpf())){
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_INVALIDO);
		}
		Optional<Cliente> resultado2 = clienteRepository.findByEmail(form.getEmail());
		if (resultado2.isPresent()) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_EMAIL_JA_CADASTRADO);
		}

		Cliente c = form.criarCliente();
		clienteRepository.save(c);
		
		return c;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public Cliente cadastrar(String nome, String cpf, String email, String telefone, LocalDate dataNascimento) {
		Optional<Cliente> resultado1 = clienteRepository.findByCpf(cpf);
		if (resultado1.isPresent()){
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_JA_CADASTRADO);
		}
		if (!CpfUtil.validaCPF(cpf)){
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_INVALIDO);
		}
		Optional<Cliente> resultado2 = clienteRepository.findByEmail(email);
		if (resultado2.isPresent()) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_EMAIL_JA_CADASTRADO);
		}

		Cliente c = new Cliente();
		c.setNome(nome.toUpperCase());
		c.setCpf(cpf);
		c.setDataNascimento(dataNascimento);
		c.setEmail(email);
		c.setTelefone(telefone);
		clienteRepository.save(c);
		
		return c;
	}
	
	public Cliente buscarPorId(Long id) {
		Optional<Cliente> resultado = clienteRepository.findById(id);
		if(resultado.isPresent()) {
			return resultado.get();
		}
		return null;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public Boolean deletarPorId(Long id) {
		Optional<Cliente> resultado = clienteRepository.findById(id);
		if(resultado.isPresent()) {
			clienteRepository.delete(resultado.get());
			return true;
		}
		return false;
	}
	
	public boolean jaExiste(String cpf) {
		if (!CpfUtil.validaCPF(cpf)){
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_INVALIDO);
		}
		Optional<Cliente> resultado = clienteRepository.findByCpf(cpf);
		if(resultado.isPresent()) {
			return true;
		}
		return false;
	}

	@Transactional(rollbackFor = Exception.class)
	public Boolean atualizar(AtualizacaoClienteForm form) {
		Optional<Cliente> resultado = clienteRepository.findByCpf(form.getCpf());
		
		if (resultado.isPresent()) {
			Cliente c = resultado.get();
			c.setNome(form.getNome());
			c.setEmail(form.getEmail());
			c.setTelefone(form.getTelefone());
			clienteRepository.save(c);
			return true;
		}
		return false;
	}
//
//	@Transactional(rollbackFor = Exception.class)
//	public boolean deletar(String cpf) {
//		Cliente c = clienteRepository.findByCpf(cpf);
//
//		if (c == null) {
//			return false;
//		}
//
//		clienteRepository.delete(c);
//		return true;
//	}
//
//	public ClienteDTO buscarClientePorCpf(String cpf) {
//		Cliente c = clienteRepository.findByCpf(cpf);
//
//		if (c == null) {
//			return null;
//		}
//
//
//		return new ClienteDTO(c);
//	}
//
//	public List<ClienteDTO> buscarClientesPorNome(String nome) {
//		List<Cliente> clientes = clienteRepository.findByNomeContains(nome);
//		return ClienteDTO.converter(clientes);
//	}
}
