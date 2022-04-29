export interface IExtrato {
  dataHora: string;
  tipo: string;
  nomeClienteOrigem: string;
  agenciaOrigem: string;
  numeroOrigem: string;
  nomeClienteDestino: string;
  agenciaDestino: string;
  numeroDestino: string;
  valor: number;
  saldoApos: number;
}
