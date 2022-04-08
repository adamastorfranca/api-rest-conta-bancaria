package br.com.adamastor.banco.model.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.adamastor.banco.model.dto.ClienteDTO;
import br.com.adamastor.banco.model.entity.Cliente;
import br.com.adamastor.banco.model.exception.AplicacaoException;
import br.com.adamastor.banco.model.exception.ExceptionValidacoes;
import br.com.adamastor.banco.model.form.CadastroClienteForm;
import br.com.adamastor.banco.model.repository.ClienteRepository;
import br.com.adamastor.banco.model.util.CpfUtil;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;
	@Autowired
	private ContaBancariaService contaBancariaService;

	@Transactional(rollbackFor = Exception.class)
	public ClienteDTO cadastrar(CadastroClienteForm form) {
		Optional<Cliente> resultado1 = clienteRepository.findByCpf(form.getCpf());
		if (resultado1.isPresent() && !CpfUtil.validaCPF(form.getCpf())){
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_JA_CADASTRADO);
		}
		if (!CpfUtil.validaCPF(form.getCpf())){
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_INVALIDO);
		}
		Optional<Cliente> resultado2 = clienteRepository.findByEmail(form.getEmail());
		if (resultado2.isPresent()) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_EMAIL_JA_CADASTRADO);
		}
		if (!form.getSenha().equals(form.getSenhaConfirmar())) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SENHAS_NAO_CORRESPONDEM);
		}

		Cliente c = form.criarCliente();
		contaBancariaService.criarConta(c, form);
		clienteRepository.save(c);
		
		return new ClienteDTO(c);
	}


//	@Transactional(rollbackFor = Exception.class)
//	public boolean atualizar(AtualizacaoClienteForm form) {
//		if (!cpfAptoParaAtualizacaoCadastral(form.getCpf())) {
//			return false;
//		}
//		
//		Cliente c = clienteRepository.findByCpf(form.getCpf());
//		
//		if (form.getNome() != null && !form.getNome().isBlank()){
//			c.setNome(form.getNome());
//		}
//		if (form.getEmail() != null && !form.getEmail().isBlank()){
//			c.setEmail(form.getEmail());
//		}
//		if (form.getTelefone() != null && !form.getTelefone().isBlank()){
//			c.setTelefone(form.getTelefone());
//		}
//		
//		clienteRepository.save(c);
//		
//		return true;
//	}
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
//	public List<ClienteDTO> buscarTodosClientes() {
//		return ClienteDTO.converter(clienteRepository.findAll());
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
