package br.com.adamastor.banco.controller.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("rest/transacoes")
public class TransacaoRest {

//	@Autowired
//	private TransacaoService transacaoService;	
//
//	@GetMapping(value = "/consultar-extrato/{agencia}/{numeroConta}", produces = MediaType.APPLICATION_JSON_VALUE)
//	public @ResponseBody ResponseEntity<List<TransacaoDTO>> consultarExtrato(@PathVariable  String agencia, @PathVariable  String numeroConta){
//		List<TransacaoDTO> dto = transacaoService.consultarExtrato(agencia, numeroConta);
//		if (dto == null || dto.isEmpty()) {
//			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//		}
//		return new ResponseEntity<>(dto, HttpStatus.OK);
//	}
//	
//	@GetMapping(value = "/extrato-por-mes-ano/{agencia}/{numeroConta}/{mes}/{ano}", produces = MediaType.APPLICATION_JSON_VALUE)
//	public @ResponseBody ResponseEntity<List<TransacaoDTO>> consultarExtratoPorMesAno(@PathVariable  String agencia, @PathVariable  String numeroConta, 
//																					@PathVariable  int mes, @PathVariable  int ano){
//		List<TransacaoDTO> dto = transacaoService.obterExtratoPorMesAno(agencia, numeroConta, mes, ano);
//		if (dto == null || dto.isEmpty()) {
//			return new ResponseEntity<>(dto, HttpStatus.NO_CONTENT);
//		}
//		return new ResponseEntity<>(dto, HttpStatus.OK);
//	}
//	
//	@PostMapping(value = "/extrato-por-periodo-especifico", produces = MediaType.APPLICATION_JSON_VALUE)
//	public @ResponseBody ResponseEntity<List<TransacaoDTO>> consultarExtratoPorPeriodoEspecifico(@RequestBody ConsultaExtratoPeriodoDTO form){
//		List<TransacaoDTO> dto = transacaoService.obterExtratoPorPeriodoEspecifico(form);
//		if (dto == null || dto.isEmpty()) {
//			return new ResponseEntity<>(dto, HttpStatus.NO_CONTENT);
//		}
//		return new ResponseEntity<>(dto, HttpStatus.OK);
//	}
}
