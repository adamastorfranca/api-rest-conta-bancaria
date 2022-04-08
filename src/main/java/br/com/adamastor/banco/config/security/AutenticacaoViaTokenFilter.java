package br.com.adamastor.banco.config.security;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.adamastor.banco.model.entity.ContaBancaria;
import br.com.adamastor.banco.model.repository.ContaBancariaRepository;

public class AutenticacaoViaTokenFilter extends OncePerRequestFilter {

	private TokenService tokenService;
	private ContaBancariaRepository contaBancariaRepository;
	
	public AutenticacaoViaTokenFilter(TokenService tokenService, ContaBancariaRepository contaBancariaRepository) {
		this.tokenService = tokenService;
		this.contaBancariaRepository = contaBancariaRepository;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {	
		String token = recuperarToken(request);
		boolean valido = tokenService.isTokenValido(token);
		if (valido) {
			autenticarCliente(token);
		}
		filterChain.doFilter(request, response);
	}

	private void autenticarCliente(String token) {
		Long idConta = tokenService.getIdConta(token);
		Optional<ContaBancaria> resutado = contaBancariaRepository.findById(idConta);
		if(resutado.isPresent()) {
			ContaBancaria conta = resutado.get();
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(conta, null, conta.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}	
	}

	private String recuperarToken(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		if (token == null || token.isEmpty() || !token.startsWith("Bearer ")) {
			return null;
		}
		return token.substring(7, token.length());
	}

}
