import axios from 'axios';

// Configura a URL base para as requisições
const API_BASE = axios.create({
    baseURL: 'https://loteriascaixa-api.herokuapp.com/api/lotofacil',
});

// Define os endpoints da API
const EndPoints = {
    lotofacil: '', // Endpoint para obter todos os resultados da Lotofacil
    concurso: 'concurso', // Endpoint para obter um resultado por concurso da Lotofacil
    latest: 'latest', // Endpoint para obter o último resultado da Lotofacil
};

// Define os serviços de API
const APIService = {
    getLotofacil: () => API_BASE.get(EndPoints.lotofacil), // Obtém todos os resultados da Lotofacil
    getConcurso: (concursoNumber) => API_BASE.get(`${EndPoints.concurso}/${concursoNumber}`), // Obtém um resultado por concurso da Lotofacil
    getLatest: () => API_BASE.get(EndPoints.latest), // Obtém o último resultado da Lotofacil
};

export default APIService;
