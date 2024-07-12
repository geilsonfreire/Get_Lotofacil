import axios from 'axios';
import { LotofacilProps } from './type_interface'; // Supondo que o arquivo com as interfaces esteja importado corretamente

const API_URL_BASE: string = "https://loteriascaixa-api.herokuapp.com/api/lotofacil/";
console.log('API_URL_BASE:', API_URL_BASE);

// Função para buscar todos os resultados da Lotofácil
export const fetchAllLotofacilResults = async (): Promise<LotofacilProps[]> => {
    try {
        const response = await axios.get(API_URL_BASE);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar resultados da Lotofácil:', error);
        throw new Error('Erro ao buscar resultados da Lotofácil.');
    }
};

// Função para buscar dados de um concurso específico da Lotofácil
export const fetchLotofacilResultByConcurso = async (concurso: number): Promise<LotofacilProps> => {
    try {
        const response = await axios.get(`${API_URL_BASE}${concurso}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar resultado do concurso ${concurso} da Lotofácil:`, error);
        throw new Error(`Erro ao buscar resultado do concurso ${concurso} da Lotofácil.`);
    }
};

// Função para buscar o último resultado da Lotofácil
export const fetchLatestLotofacilResult = async (): Promise<LotofacilProps> => {
    try {
        const response = await axios.get(`${API_URL_BASE}latest`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar último resultado da Lotofácil:', error);
        throw new Error('Erro ao buscar último resultado da Lotofácil.');
    }
};