package br.com.adamastor.banco.model.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.adamastor.banco.model.dto.ContaBancariaDTO;
import br.com.adamastor.banco.model.dto.ContaBancariaLogadaDTO;
import br.com.adamastor.banco.model.dto.TransferenciaBancariaDTO;
import br.com.adamastor.banco.model.entity.Cliente;
import br.com.adamastor.banco.model.entity.ContaBancaria;
import br.com.adamastor.banco.model.entity.TipoTransacao;
import br.com.adamastor.banco.model.exception.AplicacaoException;
import br.com.adamastor.banco.model.exception.ExceptionValidacoes;
import br.com.adamastor.banco.model.form.CadastroContaForm;
import br.com.adamastor.banco.model.repository.ContaBancariaRepository;

@Service
public class ContaBancariaService {

	@Autowired
	private ContaBancariaRepository contaBancariaRepository;
	@Autowired
	private ClienteService clienteService;
	@Autowired
	private AutorizacaoService autorizacaoService;
	@Autowired
	private TransacaoService transacaoService;

	@Transactional
	public ContaBancaria criarConta(Cliente cliente, CadastroContaForm form) {
		ContaBancaria novaConta = new ContaBancaria();
		novaConta.setAgencia("0001");
		novaConta.adicionarAutorizacao(autorizacaoService.buscar("CLIENTE"));
		novaConta.setCliente(cliente);
		String senhaHash = new BCryptPasswordEncoder().encode(form.getSenha());
		novaConta.setSenha(senhaHash);
		Optional<ContaBancaria> resultado = contaBancariaRepository.findById(1L);
		Integer numeroUltima = 0;
		Integer digitoUltima = 0;
		if (!resultado.isPresent()) {
			novaConta.setNumeroConta("0001-1");
			contaBancariaRepository.save(novaConta);
		} else {
			Long ultimoId = contaBancariaRepository.buscarUltimo();
			Optional<ContaBancaria> resultado2 = contaBancariaRepository.findById(ultimoId);
			if (resultado2.isPresent()) {
				String[] contaDigito = resultado2.get().getNumeroConta().split("-");
				numeroUltima = Integer.parseInt(contaDigito[0]);
				digitoUltima = Integer.parseInt(contaDigito[1]);
				if (digitoUltima < 9) {
					digitoUltima += 1;
				} else {
					numeroUltima += 1;
					digitoUltima = 1;
				}
				novaConta.setNumeroConta(String.valueOf(String.format("%04d-%d", numeroUltima, digitoUltima)));
				novaConta.setLogin(novaConta.getAgencia() + novaConta.getNumeroConta());
				contaBancariaRepository.save(novaConta);
			}
		}
		return novaConta;
	}

	@Transactional(rollbackFor = Exception.class)
	public ContaBancariaDTO cadastrar(CadastroContaForm form) {
		if (!form.getSenha().equals(form.getSenhaConfirmar())) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SENHAS_NAO_CORRESPONDEM);
		}
		Cliente c = clienteService.cadastrar(form.getNome(), form.getCpf(), form.getEmail(), form.getTelefone(),
				form.getDataNascimento());
		ContaBancaria conta = criarConta(c, form);
		return new ContaBancariaDTO(conta);
	}

	public ContaBancaria consultarConta(String agencia, String numero) {
		Optional<ContaBancaria> resultado = contaBancariaRepository.findByAgenciaAndNumeroConta(agencia, numero);

		if (!resultado.isPresent()) {
			return null;
		}

		return resultado.get();
	}

	@Transactional(rollbackFor = Exception.class)
	public void depositar(String agencia, String numeroConta, double valor) {
		ContaBancaria conta = consultarConta(agencia, numeroConta);

		conta.setSaldo(conta.getSaldo() + valor);

		contaBancariaRepository.save(conta);
		transacaoService.salvar(TipoTransacao.DEPOSITO, valor, null, conta);
	}

	@Transactional(rollbackFor = Exception.class)
	public void sacar(String agencia, String numeroConta, double valor) {
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

	public ContaBancariaLogadaDTO consultarContaLogadaDTO(String agencia, String numero) {
		Optional<ContaBancaria> resultado = contaBancariaRepository.findByAgenciaAndNumeroConta(agencia, numero);

		if (!resultado.isPresent()) {
			return null;
		}

		return new ContaBancariaLogadaDTO(resultado.get());
	}

	public ContaBancariaDTO consultarContaDTO(String agencia, String numero) {
		Optional<ContaBancaria> resultado = contaBancariaRepository.findByAgenciaAndNumeroConta(agencia, numero);

		if (!resultado.isPresent()) {
			return null;
		}

		return new ContaBancariaDTO(resultado.get());
	}

	public ContaBancariaDTO consultarContaPorCpfDTO(String cpf) {
		Optional<ContaBancaria> resultado = contaBancariaRepository.findByClienteCpf(cpf);

		if (!resultado.isPresent()) {
			return null;
		}

		return new ContaBancariaDTO(resultado.get());
	}

	public Double consultarSaldo(String agencia, String numero) {
		Optional<ContaBancaria> resultado = contaBancariaRepository.findByAgenciaAndNumeroConta(agencia, numero);

		if (!resultado.isPresent()) {
			return null;
		}

		return resultado.get().getSaldo();
	}

//	public boolean deletar(String agencia, String numero) {
//		ContaBancaria conta = contaBancariaRepository.findByAgenciaAndNumero(agencia, numero);
//		if (conta == null) {
//			return false;
//		}
//		contaBancariaRepository.delete(conta);
//		return true;	
//	}
//	
//	public List<ContaBancariaDTO> buscarTodasContas() {
//		return ContaBancariaDTO.converter(contaBancariaRepository.findAll());
//	}

//	public List<ConsultaContaBancariaDTO> obterContasPorCpf(String cpf){
//		List<ConsultaContaBancariaDTO> listaContasRetorno = new ArrayList<>();
//		Cliente cli = clienteRepository.findByCpf(cpf);
//
//		if (cli == null) {
//			return null;
//		}
//		
//		List<ContaBancaria> listaContasCliente = contaBancariaRepository.findByCliente(cli);
//		for (ContaBancaria conta : listaContasCliente) {
//			ConsultaContaBancariaDTO dtoConta = new ConsultaContaBancariaDTO();
//			BeanUtils.copyProperties(conta, dtoConta);
//			dtoConta.setCpf(conta.getCliente().getCpf());
//			dtoConta.setNomeTitular(conta.getCliente().getNome());
//			listaContasRetorno.add(dtoConta);
//		}
//
//		return listaContasRetorno;
//	}
}
