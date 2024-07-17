// Import Bibliotecas
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Import Services API
import APIService from '../services/APIServices';

// Import icons
import { BsGraphUpArrow } from "react-icons/bs";

// Import CSS
import '../style/analise.css';

const Analise = () => {
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
    }, [error]);

    // Função para contar a ocorrência do número 1 em todas as dezenas
    const countOccurrencesOfOne = () => {
        return results.reduce((total, result) => {
            if (result.dezenas) {
                return total + result.dezenas.filter(dezena => Number(dezena) === 1).length;
            }
            return total;
        }, 0);
    };

    // Chama a função para contar as ocorrências do número 1
    const occurrencesOfOne = countOccurrencesOfOne();

    return (
        <section className='analise'>
            <h2><i><BsGraphUpArrow /></i> Análise Estatística</h2>
            <table>
                <thead>
                    <tr>
                        <th>DEZ/-01</th>
                        <th>DEZ/-02</th>
                        <th>DEZ/-03</th>
                        <th>DEZ/-04</th>
                        <th>DEZ/-05</th>
                    </tr>
                </thead>
                <tbody>
                        <tr >
                        <td>{occurrencesOfOne}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                </tbody>
            </table>
        </section>
    );
};

export default Analise;