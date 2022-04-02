package br.com.adamastor.banco.model.service;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.adamastor.banco.model.dto.ConsultaContaBancariaDTO;
import br.com.adamastor.banco.model.dto.ConsultaExtratoPeriodoDTO;
import br.com.adamastor.banco.model.dto.ContaBancariaDTO;
import br.com.adamastor.banco.model.dto.TransacaoDTO;
import br.com.adamastor.banco.model.dto.TransferenciaBancariaDTO;
import br.com.adamastor.banco.model.entity.Cliente;
import br.com.adamastor.banco.model.entity.ContaBancaria;
import br.com.adamastor.banco.model.entity.TipoTransacao;
import br.com.adamastor.banco.model.entity.Transacao;
import br.com.adamastor.banco.model.exception.AplicacaoException;
import br.com.adamastor.banco.model.exception.ExceptionValidacoes;
import br.com.adamastor.banco.model.form.CadastroContaForm;
import br.com.adamastor.banco.model.repository.ClienteRepository;
import br.com.adamastor.banco.model.repository.ContaBancariaRepository;
import br.com.adamastor.banco.model.repository.TransacaoRepository;

@Service
public class ContaBancariaService {
	
	@Autowired
	private ContaBancariaRepository contaBancariaRepository;
	@Autowired
	private ClienteRepository clienteRepository;
	@Autowired
	private TransacaoRepository transacaoRepository;
	@Autowired
	private TransacaoService transacaoService;
	
	@Transactional(rollbackFor = Exception.class)
	public ContaBancariaDTO cadastrar(CadastroContaForm form) {
		Cliente c = clienteRepository.findByCpf(form.getCpf());
		
		if (c == null) {
			return null;
		}
		
		ContaBancaria conta = contaBancariaRepository.findByAgenciaAndNumero(form.getAgencia(), form.getNumero());
		
		if (conta != null) {
			return null;
		}
		
		ContaBancaria cb = null;
		if(!form.getAgencia().isBlank() || !form.getNumero().isBlank()) {
			cb = form.criarConta();
			cb.setCliente(c);
			contaBancariaRepository.save(cb);
		}
		return new ContaBancariaDTO(cb);
	}
	
	public boolean deletar(String agencia, String numero) {
		ContaBancaria conta = contaBancariaRepository.findByAgenciaAndNumero(agencia, numero);
		if (conta == null) {
			return false;
		}
		contaBancariaRepository.delete(conta);
		return true;
		
	}

	public double consultarSaldo(String agencia, String numero) {
		ContaBancaria c = consultarConta(agencia, numero);
		return c.getSaldo();
	}

	public ContaBancaria consultarConta(String agencia, String numero) {
		ContaBancaria c = contaBancariaRepository.findByAgenciaAndNumero(agencia, numero);
		
		if (c == null) {
			return null;
		}
		
		return c;
	}
	
	public List<ConsultaContaBancariaDTO> obterContasPorCpf(String cpf){
		List<ConsultaContaBancariaDTO> listaContasRetorno = new ArrayList<>();
		Cliente cli = clienteRepository.findByCpf(cpf);

		if (cli == null) {
			return null;
		}
		
		List<ContaBancaria> listaContasCliente = contaBancariaRepository.findByCliente(cli);
		for (ContaBancaria conta : listaContasCliente) {
			ConsultaContaBancariaDTO dtoConta = new ConsultaContaBancariaDTO();
			BeanUtils.copyProperties(conta, dtoConta);
			dtoConta.setCpf(conta.getCliente().getCpf());
			dtoConta.setNomeTitular(conta.getCliente().getNome());
			listaContasRetorno.add(dtoConta);
		}

		return listaContasRetorno;
	}

	@Transactional(rollbackFor = Exception.class)
	public void depositar (String agencia, String numeroConta, double valor) {
		ContaBancaria conta = consultarConta(agencia, numeroConta);
		
		conta.setSaldo(conta.getSaldo() + valor);
					
		contaBancariaRepository.save(conta);		
		transacaoService.salvar(TipoTransacao.DEPOSITO, valor, null, conta);
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void sacar (String agencia, String numeroConta, double valor) {
		ContaBancaria conta = consultarConta(agencia, numeroConta);

		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_INSUFICIENTE);
		}
		
		conta.setSaldo(conta.getSaldo() - valor);
			
		contaBancariaRepository.save(conta);
		transacaoService.salvar(TipoTransacao.SAQUE, valor, conta, null);
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void transferir(TransferenciaBancariaDTO dto) {
		ContaBancaria contaOrigem = consultarConta(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem());
		ContaBancaria contaDestino = consultarConta(dto.getAgenciaDestino(), dto.getNumeroContaDestino());
		
		if (contaOrigem.getSaldo() < dto.getValor()) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_INSUFICIENTE); 
		}
		
		contaOrigem.setSaldo(contaOrigem.getSaldo() - dto.getValor());
		contaDestino.setSaldo(contaDestino.getSaldo() + dto.getValor());
		
		contaBancariaRepository.save(contaOrigem);
		contaBancariaRepository.save(contaDestino);
		transacaoService.salvar(TipoTransacao.TRANSFERENCIA, dto.getValor(), contaOrigem, contaDestino);
	}

}
