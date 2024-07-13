// Import Bibliotecas
import React, { useEffect, useState } from 'react';

// Import Services API
import APIService from '../services/APIServices';

// Import CSS
import '../style/AllResults.css';

const AllResultLotofacil = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await APIService.getLotofacil();
                setResults(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar os resultados: {error.message}</div>;
    }

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


