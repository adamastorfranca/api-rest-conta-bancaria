package br.com.adamastor.banco.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.adamastor.banco.model.dto.TransacaoDTO;
import br.com.adamastor.banco.model.form.ConsultaExtratoPeriodoForm;
import br.com.adamastor.banco.model.service.TransacaoService;

@RestController
@RequestMapping("rest/transacoes")
public class TransacaoRest {

	@Autowired
	private TransacaoService transacaoService;	

	@GetMapping(value = "/consultar-extrato/{agencia}/{numeroConta}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<TransacaoDTO>> consultarExtrato(@PathVariable  String agencia, @PathVariable  String numeroConta){
		List<TransacaoDTO> dto = transacaoService.consultarExtrato(agencia, numeroConta);
		if (dto == null || dto.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping(value = "/extrato-por-mes-ano/{agencia}/{numeroConta}/{mes}/{ano}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<TransacaoDTO>> consultarExtratoPorMesAno(@PathVariable  String agencia, @PathVariable  String numeroConta, 
																					@PathVariable  int mes, @PathVariable  int ano){
		List<TransacaoDTO> dto = transacaoService.obterExtratoPorMesAno(agencia, numeroConta, mes, ano);
		if (dto == null || dto.isEmpty()) {
			return new ResponseEntity<>(dto, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PostMapping(value = "/por-periodo-especifico", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<TransacaoDTO>> consultarExtratoPorPeriodoEspecifico(@RequestBody ConsultaExtratoPeriodoForm form){
		List<TransacaoDTO> dto = transacaoService.obterExtratoPorPeriodoEspecifico(form);
		if (dto == null || dto.isEmpty()) {
			return new ResponseEntity<>(dto, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
}
