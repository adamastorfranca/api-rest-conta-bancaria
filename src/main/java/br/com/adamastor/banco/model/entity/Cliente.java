package br.com.adamastor.banco.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "clientes")
@Data
public class Cliente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 50)
	private String nome;
	
	@Column(length = 11, unique = true)
	private String cpf;
	
	private String email;
	
	private String telefone;
	
	private boolean ativo = true;
	
	private String observacoes;

	public Cliente() {}
	
	public Cliente(String nome, String cpf, String email, String telefone, String observacoes) {
		this.nome = nome;
		this.cpf = cpf;
		this.email = email;
		this.telefone = telefone;
		this.observacoes = observacoes;
	}
	
	

}
