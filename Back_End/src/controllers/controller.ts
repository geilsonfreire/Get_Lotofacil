import { Request, Response } from 'express';
import Lotofacil from '../models/lotofacil';
import axios from 'axios';
import { LotofacilProps } from '../API/type_interface';

const API_URL_LOTOFACIL_BASE: string = "npm/lotofacil/";

export const fetchAndSaveAllLotofacilData = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Iniciando a busca do concurso mais recente...');
    const latestConcursoResponse = await axios.get<LotofacilProps>(API_URL_LOTOFACIL_BASE + "latest");
    const latestConcursoData: LotofacilProps = latestConcursoResponse.data;
    const latestConcurso = latestConcursoData.concurso;

    console.log(`Último concurso encontrado: ${latestConcurso}`);

    const allResults: LotofacilProps[] = [];

    for (let concurso = 1; concurso <= latestConcurso; concurso++) {
      try {
        console.log(`Buscando dados para o concurso: ${concurso}`);
        const response = await axios.get<LotofacilProps>(API_URL_LOTOFACIL_BASE + concurso);
        const data: LotofacilProps = response.data;

        // Verificar se o concurso já existe no banco de dados
        const existingConcurso = await Lotofacil.findOne({ where: { concurso: data.concurso } });

        if (existingConcurso) {
          console.log(`Concurso ${concurso} já existe no banco de dados. Pulando inserção.`);
        } else {
          // Salvar no banco de dados usando o ORM (Sequelize)
          console.log(`Salvando dados do concurso ${concurso} no banco de dados...`);
          await Lotofacil.create({
            loteria: data.loteria,
            concurso: data.concurso,
            data: data.data,
            local: data.local,
            dezenasOrdemSorteio: data.dezenasOrdemSorteio,
            dezenas: data.dezenas,
            trevos: data.trevos,
            timeCoracao: data.timeCoracao,
            mesSorte: data.mesSorte,
            premiacoes: data.premiacoes,
            estadosPremiados: data.estadosPremiados,
            observacao: data.observacao,
            acumulou: data.acumulou,
            proximoConcurso: data.proximoConcurso,
            dataProximoConcurso: data.dataProximoConcurso,
            localGanhadores: data.localGanhadores,
            valorArrecadado: data.valorArrecadado,
            valorAcumuladoConcurso_0_5: data.valorAcumuladoConcurso_0_5,
            valorAcumuladoConcursoEspecial: data.valorAcumuladoConcursoEspecial,
            valorAcumuladoProximoConcurso: data.valorAcumuladoProximoConcurso,
            valorEstimadoProximoConcurso: data.valorEstimadoProximoConcurso
          });

          allResults.push(data);
          console.log(`Dados do concurso ${concurso} salvos com sucesso.`);
        }
      } catch (err) {
        console.error(`Erro ao buscar ou salvar dados do concurso ${concurso}:`, err);
      }
    }

    res.status(200).json({ message: 'Todos os dados salvos com sucesso!', results: allResults });
  } catch (error) {
    console.error('Erro ao buscar ou salvar dados da Lotofacil:', error);
    res.status(500).json({ error: 'Erro ao salvar dados da Lotofacil' });
  }
};
