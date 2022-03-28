package br.com.adamastor.banco.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.adamastor.banco.model.dto.ConsultaContaBancariaDTO;
import br.com.adamastor.banco.model.dto.ConsultaExtratoPeriodoDTO;
import br.com.adamastor.banco.model.dto.DepositoDTO;
import br.com.adamastor.banco.model.dto.SaqueDTO;
import br.com.adamastor.banco.model.dto.TransacaoDTO;
import br.com.adamastor.banco.model.dto.TransferenciaBancariaDTO;
import br.com.adamastor.banco.model.entity.ContaBancaria;
import br.com.adamastor.banco.model.form.CadastroContaForm;
import br.com.adamastor.banco.model.service.ContaBancariaService;

@RestController
@RequestMapping("rest/contas")
public class ContaBancariaRest {

	@Autowired
	private ContaBancariaService contaBancariaService;
	
	@PostMapping(value = "/cadastrar")
	public ResponseEntity<Void> cadastrar(@RequestBody CadastroContaForm form) {
		ContaBancaria conta = contaBancariaService.cadastrar(form);
		if(conta == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping(value = "/consultar-saldo/{agencia}/{numero}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Double> consultarSaldo(@PathVariable  String agencia, @PathVariable  String numeroConta){
		double saldo = contaBancariaService.consultarSaldo(agencia, numeroConta);

		return new ResponseEntity<>(saldo, HttpStatus.OK);
	}
	
	@GetMapping(value = "/consultar-contas-por-cpf/{cpf}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<ConsultaContaBancariaDTO>> consultarContasPorCpf(@PathVariable String cpf){
		List<ConsultaContaBancariaDTO> contas = contaBancariaService.obterContasPorCpf(cpf);
		if (contas == null || contas.isEmpty()) {
			return new ResponseEntity<List<ConsultaContaBancariaDTO>>(contas, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<ConsultaContaBancariaDTO>>(contas, HttpStatus.OK);
	}
	
	@PutMapping(value = "/deposito", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Void> depositar(@RequestBody DepositoDTO dto){
		contaBancariaService.depositar(dto.getAgencia(), dto.getNumeroConta(), dto.getValor());
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@PutMapping(value = "/saque", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Void> sacar(@RequestBody SaqueDTO dto){
		contaBancariaService.sacar(dto.getAgencia(), dto.getNumeroConta(), dto.getValor());
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@PutMapping(value = "/transferencia", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Void> transferir(@RequestBody TransferenciaBancariaDTO dto){
		contaBancariaService.transferir(dto);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@GetMapping(value = "/consultar-extrato/{agencia}/{numeroConta}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<TransacaoDTO>> consultarExtrato(@PathVariable  String agencia, @PathVariable  String numeroConta){
		List<TransacaoDTO> dto = contaBancariaService.consultarExtrato(agencia, numeroConta);
		if (dto == null || dto.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<TransacaoDTO>>(dto, HttpStatus.OK);
	}
	
	@GetMapping(value = "/extrato-por-mes-ano/{agencia}/{numeroConta}/{mes}/{ano}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<TransacaoDTO>> consultarExtratoPorMesAno(@PathVariable  String agencia, @PathVariable  String numeroConta, 
																					@PathVariable  int mes, @PathVariable  int ano){
		List<TransacaoDTO> dto = contaBancariaService.obterExtratoPorMesAno(agencia, numeroConta, mes, ano);
		if (dto == null || dto.isEmpty()) {
			return new ResponseEntity<List<TransacaoDTO>>(dto, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<TransacaoDTO>>(dto, HttpStatus.OK);
	}
	
	@PostMapping(value = "/extrato-por-periodo-especifico", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<TransacaoDTO>> consultarExtratoPorPeriodoEspecifico(@RequestBody ConsultaExtratoPeriodoDTO form){
		List<TransacaoDTO> dto = contaBancariaService.obterExtratoPorPeriodoEspecifico(form);
		if (dto == null || dto.isEmpty()) {
			return new ResponseEntity<List<TransacaoDTO>>(dto, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<TransacaoDTO>>(dto, HttpStatus.OK);
	}
}
