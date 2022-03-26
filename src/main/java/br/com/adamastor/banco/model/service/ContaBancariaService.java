package br.com.adamastor.banco.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.adamastor.banco.model.dto.ConsultaContaBancariaDTO;
import br.com.adamastor.banco.model.dto.TransferenciaBancariaDTO;
import br.com.adamastor.banco.model.entity.Cliente;
import br.com.adamastor.banco.model.entity.ContaBancaria;
import br.com.adamastor.banco.model.repository.ContaBancariaRepository;

@Service
public class ContaBancariaService {
	
	@Autowired
	private ContaBancariaRepository contaBancariaRepository;
	@Autowired
	private ClienteService clienteService;
	
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
	
	public void depositar (String agencia, String numeroConta, double valor) {
		ContaBancaria conta = consultarConta(agencia, numeroConta);
		conta.setSaldo(conta.getSaldo() + valor);
		contaBancariaRepository.save(conta);
	}
	
	public void sacar (String agencia, String numeroConta, double valor) {
		ContaBancaria conta = consultarConta(agencia, numeroConta);

		if (conta.getSaldo() < valor) {
			throw new RuntimeException("Saldo insuficiente!");
		}
		
		conta.setSaldo(conta.getSaldo() - valor);
		contaBancariaRepository.save(conta);
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void transferir(TransferenciaBancariaDTO dto) {
		this.sacar(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem(), dto.getValor());
		this.depositar(dto.getAgenciaDestino(), dto.getNumeroContaDestino(), dto.getValor());
	}
	
	public List<ConsultaContaBancariaDTO> obterContasPorCpf(String cpf){
		List<ConsultaContaBancariaDTO> listaContasRetorno = new ArrayList<>();
		Cliente cli = clienteService.obterClientePorCpf(cpf);

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

}
