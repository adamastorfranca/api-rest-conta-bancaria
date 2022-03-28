package br.com.adamastor.banco.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "contas")
public class ContaBancaria {

	@Id	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 4, nullable = false)
	private String agencia;
	
	@Column(length = 6, nullable = false)
	private String numero;
	
	@Column(nullable = false)
	private double saldo = 0;
	
	private boolean ativa = true;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fk_cliente_id")
	private Cliente cliente;

	public ContaBancaria() {}
	
	public ContaBancaria(String agencia, String numero) {
		this.agencia = agencia;
		this.numero = numero;
	}

}
