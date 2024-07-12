import axios from 'axios';
import Lotofacil from '../models/ModuleLotofacil';
import { LotofacilProps } from '../API/type_interface';

// URL da API da Lotofácil
const API_URL_LOTOFACIL_BASE: string = "https://loteriascaixa-api.herokuapp.com/api/lotofacil/";

// Função para buscar e salvar todos os resultados da Lotofácil
export const fetchAndSaveAllLotofacilData = async (): Promise<void> => {
    console.log('Iniciando a busca dos resultados da Lotofácil...');
    try {
        console.log('Iniciando a busca dos resultados da Lotofácil...');
        const response = await axios.get(API_URL_LOTOFACIL_BASE);
        const allResults: LotofacilProps[] = response.data;

        for (const result of allResults) {
            // Verificar se o concurso já existe no banco de dados
            const existingConcurso = await Lotofacil.findOne({ where: { concurso: result.concurso } });

            if (existingConcurso) {
                console.log(`Concurso ${result.concurso} já existe no banco de dados. Pulando inserção.`);
            } else {
                // Salvar no banco de dados usando o modelo Lotofacil
                await Lotofacil.create(result); // Utilizando diretamente o objeto result que já é do tipo LotofacilProps

                console.log(`Dados do concurso ${result.concurso} salvos com sucesso.`);
            }
        }

        console.log('Todos os dados salvos com sucesso!');
    } catch (error) {
        console.error('Erro ao buscar ou salvar dados da Lotofácil:', error);
        throw new Error('Erro ao buscar ou salvar dados da Lotofácil.');
    }
};