package br.com.adamastor.banco.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.adamastor.banco.model.dto.ClienteDTO;
import br.com.adamastor.banco.model.entity.Cliente;
import br.com.adamastor.banco.model.form.AtualizacaoClienteForm;
import br.com.adamastor.banco.model.form.CadastroClienteForm;
import br.com.adamastor.banco.model.repository.ClienteRepository;
import br.com.adamastor.banco.model.util.CpfUtil;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;

	public ClienteDTO cadastrar(CadastroClienteForm form) {
		if (!cpfAptoParaCadastro(form.getCpf())){
			return null;
		}

		Cliente c = form.criarCliente();
		clienteRepository.save(c);

		return new ClienteDTO(c);
	}

	@Transactional(rollbackFor = Exception.class)
	public boolean atualizar(AtualizacaoClienteForm form) {
		if (!cpfAptoParaAtualizacaoCadastral(form.getCpf())) {
			return false;
		}
		
		Cliente c = clienteRepository.findByCpf(form.getCpf());
		
		if (form.getNome() != null && !form.getNome().isBlank()){
			c.setNome(form.getNome());
		}
		if (form.getEmail() != null && !form.getEmail().isBlank()){
			c.setEmail(form.getEmail());
		}
		if (form.getTelefone() != null && !form.getTelefone().isBlank()){
			c.setTelefone(form.getTelefone());
		}
		if (form.getObservacoes() != null && !form.getObservacoes().isBlank()){
			c.setObservacoes(form.getObservacoes());
		}		
		c.setAtivo(form.getAtivo());
		
		clienteRepository.save(c);
		
		return true;
	}

	@Transactional(rollbackFor = Exception.class)
	public boolean deletar(String cpf) {
		Cliente c = clienteRepository.findByCpf(cpf);

		if (c == null) {
			return false;
		}

		clienteRepository.delete(c);
		return true;
	}

	public List<ClienteDTO> buscarTodosClientes() {
		return ClienteDTO.converter(clienteRepository.findAll());
	}

	public ClienteDTO buscarClientePorCpf(String cpf) {
		Cliente c = clienteRepository.findByCpf(cpf);

		if (c == null) {
			return null;
		}

		ClienteDTO dto = new ClienteDTO(c);

		return dto;
	}

	public List<ClienteDTO> buscarClientesPorNome(String nome) {
		List<Cliente> clientes = clienteRepository.findByNomeContains(nome);

		if (clientes == null || clientes.isEmpty()) {
			return null;
		}

		return ClienteDTO.converter(clientes);
	}

	private boolean cpfAptoParaCadastro(String cpf) {
		Cliente c = clienteRepository.findByCpf(cpf);

		if (c == null && CpfUtil.validaCPF(cpf)) {
			return true;
		}
		
		return false;
	}
	
	private boolean cpfAptoParaAtualizacaoCadastral(String cpf) {
		Cliente c = clienteRepository.findByCpf(cpf);
		
		if( c != null && CpfUtil.validaCPF(cpf)) {
			return true;
		}
		
		return false;
	}
}
