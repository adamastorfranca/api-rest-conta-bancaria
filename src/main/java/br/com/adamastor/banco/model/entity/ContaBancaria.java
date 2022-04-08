package br.com.adamastor.banco.model.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Entity
@Data
@Table(name = "contas")
public class ContaBancaria  implements UserDetails {

	private static final long serialVersionUID = -7120208227639413568L;

	@Id	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 4, nullable = false)
	private String agencia;
	
	@Column(length = 6, nullable = false)
	private String numeroConta;
	
	private double saldo = 0;
	
	private boolean ativa = true;
	
	private String senha;
		
	@ManyToOne
	@JoinColumn(name = "fk_cliente_id")
	private Cliente cliente;
	
	@ManyToMany
	private List<Autorizacao> autorizacoes = new ArrayList<>();

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.autorizacoes;
	}

	@Override
	public String getPassword() {
		return this.senha;
	}

	@Override
	public String getUsername() {
		return this.numeroConta;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public void adicionarAutorizacao(Autorizacao autorizacao) {
		this.autorizacoes.add(autorizacao);
		
	}

}
