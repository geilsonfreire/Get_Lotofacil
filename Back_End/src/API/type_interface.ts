// interfaces
export interface Premiacao {
  descricao: string;
  faixa: number;
  ganhadores: number;
  valorPremio: number;
}

export interface LocalGanhadores {
  ganhadores: number;
  municipio: string;
  nomeFantasiaUL: string;
  serie: string;
  posicao: number;
  uf: string;
}

export interface LotofacilProps {
  loteria: string;
  concurso: number;
  data: string;
  local: string;
  dezenasOrdemSorteio: string[];
  dezenas: string[];
  trevos: string[];
  timeCoracao: string | null;
  mesSorte: string | null;
  premiacoes: Premiacao[];
  estadosPremiados: any[];
  observacao: string;
  acumulou: boolean;
  proximoConcurso: number;
  dataProximoConcurso: string;
  localGanhadores: LocalGanhadores[];
  valorArrecadado: number;
  valorAcumuladoConcurso_0_5: number;
  valorAcumuladoConcursoEspecial: number;
  valorAcumuladoProximoConcurso: number;
  valorEstimadoProximoConcurso: number;
}