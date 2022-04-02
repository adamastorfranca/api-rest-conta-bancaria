package br.com.adamastor.banco.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "transacoes")
public class Transacao {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private LocalDateTime dataHora = LocalDateTime.now();
	
	@Enumerated(EnumType.STRING)
	private TipoTransacao tipo;
	
	private double valor;
	
	@OneToOne
	@JoinColumn(name = "fk_conta_origem_id")
	private ContaBancaria origem;
	
	@OneToOne
	@JoinColumn(name = "fk_conta_destino_id")
	private ContaBancaria destino;
	
	private double saldoAposContaOrigem;
	
	private double saldoAposContaDestino;

}