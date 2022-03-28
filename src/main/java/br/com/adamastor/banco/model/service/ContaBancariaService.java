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
import br.com.adamastor.banco.model.entity.Transacao;
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
	
	@Transactional(rollbackFor = Exception.class)
	public void depositar (String agencia, String numeroConta, double valor) {
		ContaBancaria conta = consultarConta(agencia, numeroConta);
		
		conta.setSaldo(conta.getSaldo() + valor);
					
		contaBancariaRepository.save(conta);
		transacaoRepository.save(new Transacao("DEPÓSITO", valor, null, conta));
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void sacar (String agencia, String numeroConta, double valor) {
		ContaBancaria conta = consultarConta(agencia, numeroConta);

		if (conta.getSaldo() < valor) {
			throw new RuntimeException("Saldo insuficiente!");
		}
		
		conta.setSaldo(conta.getSaldo() - valor);
			
		contaBancariaRepository.save(conta);
		transacaoRepository.save(new Transacao("SAQUE", valor, conta, null));	
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void transferir(TransferenciaBancariaDTO dto) {
		ContaBancaria contaOrigem = consultarConta(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem());
		ContaBancaria contaDestino = consultarConta(dto.getAgenciaDestino(), dto.getNumeroContaDestino());
		
		if (contaOrigem.getSaldo() < dto.getValor()) {
			throw new RuntimeException("Saldo insuficiente!");
		}
		
		contaOrigem.setSaldo(contaOrigem.getSaldo() - dto.getValor());
		contaDestino.setSaldo(contaDestino.getSaldo() + dto.getValor());
		
		contaBancariaRepository.save(contaOrigem);
		contaBancariaRepository.save(contaDestino);		
		transacaoRepository.save(new Transacao("TRANSFERÊNCIA", dto.getValor(), contaOrigem, contaDestino));
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

	public List<TransacaoDTO> consultarExtrato(String agencia, String numero){
		ContaBancaria c = consultarConta(agencia, numero);	
		List<Transacao> transacoesDaConta = transacaoRepository.buscarTransacoesPorConta(c);
		
		return TransacaoDTO.converterEmExtrato(transacoesDaConta);
	}

	public List<TransacaoDTO> obterExtratoPorMesAno(String agencia, String numero, int mes, int ano){
		ContaBancaria c = consultarConta(agencia, numero);
		LocalDateTime inicioPeriodo = LocalDateTime.of(ano, mes, 1, 0, 0, 00);
		LocalDateTime finalPeriodo = LocalDateTime.of(ano, mes, Month.of(mes).maxLength(), 23, 59, 59);
		List<Transacao> transacoesDoPerido = transacaoRepository.buscarTransacoesPorPeriodo(c, inicioPeriodo, finalPeriodo);

		return TransacaoDTO.converterEmExtrato(transacoesDoPerido);
	}
	
	public List<TransacaoDTO> obterExtratoPorPeriodoEspecifico(ConsultaExtratoPeriodoDTO form){
		ContaBancaria c = consultarConta(form.getAgencia(), form.getNumeroConta());
		LocalDateTime inicioPeriodo = LocalDateTime.of(form.getAnoInicio(), form.getMesInicio(), form.getDiaInicio(), 0, 0, 0);
		LocalDateTime finalPeriodo = LocalDateTime.of(form.getAnoFinal(), form.getMesFinal(), form.getDiaFinal(), 23, 59, 59);
		List<Transacao> transacoesDaConta = transacaoRepository.buscarTransacoesPorPeriodo(c, inicioPeriodo, finalPeriodo);
		
		return TransacaoDTO.converterEmExtrato(transacoesDaConta);
	}

}
