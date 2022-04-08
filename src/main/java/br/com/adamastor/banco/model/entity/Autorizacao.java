package br.com.adamastor.banco.model.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

import lombok.Data;

@Entity
@Data
@Table(name = "autorizacoes")
public class Autorizacao implements GrantedAuthority {
	
	private static final long serialVersionUID = -6060922571867363450L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nomeAutorizacao;

	@Override
	public String getAuthority() {
		return this.nomeAutorizacao;
	}

}
