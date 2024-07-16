// Import Bibliotecas
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Import Services API
import APIService from '../services/APIServices';

//  icons
import { BsCardList } from "react-icons/bs";

// Import CSS
import '../style/AllResults.css';

const AllResultLotofacil = () => {
    const [results, setResults] = useState([]); // Inicializa o estado dos resultados
    const [loading, setLoading] = useState(true);  // Inicializa o estado de carregamento
    const [error, setError] = useState(null); // Inicializa o estado de erro

    useEffect(() => {
        let toastId = null; // Variável para armazenar o ID do toast

        const fetchResults = async () => {
            try {
                const response = await APIService.getLotofacil(); // Chama a API para pegar os resultados da Lotofácil
                setResults(response.data); // Atualiza o estado dos resultados
                setLoading(false); // Atualiza o estado de carregamento

                // Exibe o toast apenas se ainda não estiver sendo exibido
                if (!toastId) {
                    toastId = toast.info("Dados atualizados.", {
                        autoClose: 3000, // Fechar automaticamente após 3 segundos
                        onClose: () => setLoading(false), // Quando fechar, atualiza o estado de carregamento
                    });
                } else {
                    setLoading(false); // Finaliza o estado de carregamento
                }

            } catch (err) {
                console.error("Erro ao carregar dados do concurso:", error);
                toast.error("Erro ao carregar dados do concurso.");
                setLoading(false); // Finaliza o estado de carregamento em caso de erro
            }
        };

        fetchResults(); // Chama a função para buscar os resultados

        return () => {
            if (toastId) {
                toast.dismiss(toastId); // Fecha o toast se o componente for desmontado antes do tempo definido
            }
        };
    }, []);

    // Rederizando jsx
    return (
        <div className="all-results">
            <h1><i><BsCardList /></i> Resultados da Lotofácil</h1>
            <table>
                <thead>
                    <tr>
                        <th>Concurso</th>
                        <th>Data</th>
                        <th>Dezenas</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(result => (
                        <tr key={result.concurso}>
                            <td>{result.concurso}</td>
                            <td>{result.data}</td>
                            <td>{result.dezenas ? result.dezenas.join(', ') : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllResultLotofacil;


