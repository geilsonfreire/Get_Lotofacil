// Import Bibliotecas
import React, { useEffect, useState } from 'react';

// Import Services API
import APIService from '../services/APIServices';

// Import CSS
import '../style/AllResults.css';

const AllResultLotofacil = () => {
    const [results, setResults] = useState([]); // Inicializa o estado dos resultados
    const [loading, setLoading] = useState(true);  // Inicializa o estado de carregamento
    const [error, setError] = useState(null); // Inicializa o estado de erro

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await APIService.getLotofacil(); // Chama a API para pegar os resultados da Lotofácil
                setResults(response.data); // Atualiza o estado dos resultados
                setLoading(false); // Atualiza o estado de carregamento
            } catch (err) {
                setError(err); // Atualiza o estado de erro
                setLoading(false); // Atualiza o estado de carregamento mesmo em caso de erro
            }
        };

        fetchResults(); // Chama a função para buscar os resultados
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    } // Exibe mensagem de carregamento enquanto os dados estão sendo buscados

    if (error) {
        return <div>Erro ao carregar os resultados: {error.message}</div>;
    } // Exibe mensagem de erro em caso de falha na busca dos resultados

    return (
        <div>
            <h1>Resultados da Lotofácil</h1>
            <table>
                <thead>
                    <tr>
                        <th>Concurso</th>
                        <th>Data</th>
                        <th>Dezenas</th>
                        <th>Acumulou</th>
                        <th>Local do Sorteio</th>
                        <th>Ganhadores</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(result => (
                        <tr key={result.concurso}>
                            <td>{result.concurso}</td>
                            <td>{result.data}</td>
                            <td>{result.dezenas ? result.dezenas.join(', ') : 'N/A'}</td>
                            <td>{result.acumulou ? 'Sim' : 'Não'}</td>
                            <td>{result.local}</td>
                            <td>{result.localGanhadores && result.localGanhadores.length > 0 ? result.localGanhadores.length : 'Nenhum'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllResultLotofacil;


