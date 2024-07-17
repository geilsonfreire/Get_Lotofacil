// Import Bibliotecas
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Import Services API
import APIService from '../services/APIServices';

//  icons
import { BsCardList, BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

// Import CSS
import '../style/AllResults.css';

const AllResultLotofacil = () => {
    const [results, setResults] = useState([]); // Inicializa o estado dos resultados
    const [loading, setLoading] = useState(true);  // Inicializa o estado de carregamento
    const [error, setError] = useState(null); // Inicializa o estado de erro
    const [isSorted, setIsSorted] = useState(false); // Novo estado para controle da ordenação
    const [sortDirection, setSortDirection] = useState(''); // Novo estado para direção da ordenação

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

    // Funções para manipular a ordenação
    const sortResults = (direction) => {
        setIsSorted(true);
        setSortDirection(direction);
    };

    // Ordena os resultados antes de renderizar, se necessário
    const sortedResults = isSorted ? [...results].sort((a, b) => {
        const sumA = a.dezenas ? a.dezenas.map(Number).reduce((acc, current) => acc + current, 0) : 0;
        const sumB = b.dezenas ? b.dezenas.map(Number).reduce((acc, current) => acc + current, 0) : 0;
        return sortDirection === 'maior' ? sumB - sumA : sumA - sumB;
    }) : results;

    // Rederizando jsx
    return (
        <div className="all-results">
            <h1><i><BsCardList /></i> Resultados da Lotofácil</h1>
            <div className="filter">
                <h2>Filtrar por maior e menor:</h2>
                <div className="filter-button">
                    <button onClick={() => sortResults('maior')}> <i><BsFillCaretUpFill /></i> </button>
                    <button onClick={() => sortResults('menor')}> <i><BsFillCaretDownFill /></i></button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Concurso</th>
                        <th>Data</th>
                        <th>Dezenas</th>
                        <th>Soma das dezenas</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedResults.map(result => (
                        <tr key={result.concurso}>
                            <td>{result.concurso}</td>
                            <td>{result.data}</td>
                            <td>{result.dezenas ? result.dezenas.join(', ') : 'N/A'}</td>
                            <td>{result.dezenas ? result.dezenas.map(Number).reduce((acc, current) => acc + current, 0) : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllResultLotofacil;


