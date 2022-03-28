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

import br.com.adamastor.banco.model.dto.ClienteDTO;
import br.com.adamastor.banco.model.entity.Cliente;
import br.com.adamastor.banco.model.form.CadastroClienteForm;
import br.com.adamastor.banco.model.service.ClienteService;

@RestController
@RequestMapping("rest/clientes")
public class ClienteRest {
	
	@Autowired
	private ClienteService clienteService;
	
	@PostMapping(value = "/cadastrar")
	public ResponseEntity<Void> cadastrar(@RequestBody CadastroClienteForm form) {
		Cliente c = clienteService.cadastrar(form);
		if(c == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<ClienteDTO>> buscarTodosClientes() {
		List<ClienteDTO> dto = clienteService.buscarTodosClientes();
		
		if (dto == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping(value = "/buscar-por-cpf/{cpf}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<ClienteDTO> buscarClientePorCpf(@PathVariable String cpf) {
		ClienteDTO dto = clienteService.buscarClientePorCpf(cpf);
		
		if (dto == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping(value = "/buscar-por-nome/{nome}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<ClienteDTO>> buscarCLientesPorNome(@PathVariable String nome){
		
		List<ClienteDTO> dto = clienteService.buscarClientesPorNome(nome);
		
		if (dto == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(dto, HttpStatus.OK);		
	}
}
