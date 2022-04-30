package br.com.adamastor.banco.model.entity;

import java.io.Serializable;
import java.time.LocalDate;

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
public class Cliente  implements Serializable {

	private static final long serialVersionUID = 2420476756166290647L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 50)
	private String nome;
	
	@Column(length = 11, unique = true)
	private String cpf;
	
	private LocalDate dataNascimento;
	
	private String email;
	
	private String telefone;
	
	private Boolean temConta = false;

	
}
