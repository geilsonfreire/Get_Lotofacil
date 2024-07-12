import React, { useEffect, useState } from 'react';
import APIService from '../services/APIServices';

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
            <h1>Resultados da Lotofacil</h1>
            <ul>
                {results.map(result => (
                    <li key={result.id}>
                        Concurso: {result.concurso}, Data: {result.data}, Números: {result.numeros ? result.numeros.join(', ') : 'N/A'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllResultLotofacil;

