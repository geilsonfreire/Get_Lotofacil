// Import Bibliotecas
import React from 'react';

// Import Hooks
import useFetchLotofacil from '../hooks/useFetchLotofacil';

// Import icons
import { BsGraphUpArrow } from "react-icons/bs";

// Import CSS
import '../style/analise.css';

const Analise = () => {
    const { results } = useFetchLotofacil(); // Chamando o hook para buscar os resultados da Lotofácil

    // Função genérica para contar a ocorrência de um número específico
    const countOccurrencesOfNumber = (number) => {
        return results.reduce((total, result) => {
            if (result.dezenas) {
                return total + result.dezenas.filter(dezena => Number(dezena) === number).length;
            }
            return total;
        }, 0);
    };

    // Armazenar as ocorrências de 1 a 25 em um array
    const occurrences = Array.from({ length: 25 }, (_, i) => countOccurrencesOfNumber(i + 1));

    // Encontrar os valores máximo e mínimo
    const maxOccurrences = Math.max(...occurrences);
    const minOccurrences = Math.min(...occurrences);

    // Função para determinar a classe de estilo com base no valor
    const getCellStyle = (value) => {
        if (value === maxOccurrences) {
            return {
                backgroundColor: 'green', // Fundo verde para o maior valor
                color: 'white',            // Texto branco  
            }; // Maior valor
        } else if (value === minOccurrences) {
            return {
                backgroundColor: 'red', // Fundo verde para o maior valor
                color: 'white',            // Texto branco
            }; // Menor valor
        } else {
            return {}; // Valor neutro
        }
    };

    return (
        <section className='analise'>
            <h2><i><BsGraphUpArrow /></i> Análise Estatística</h2>
            <div className="conatiner-analise">

                {/* Tabela de análise dezenas Quent e Frias */}
                <div className="soma-dez-sorteada">
                    <h3>Analise da Dez Quente / Fria</h3>
                    {Array.from({ length: 5 }, (_, rowIndex) => (
                        <table key={rowIndex}>
                            <thead>
                                <tr>
                                    {Array.from({ length: 5 }, (_, colIndex) => (
                                        <th key={colIndex}><span>DEZ/</span>{rowIndex * 5 + colIndex + 1}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {Array.from({ length: 5 }, (_, colIndex) => {
                                        const numberIndex = rowIndex * 5 + colIndex;
                                        return (
                                            <td key={colIndex} style={getCellStyle(occurrences[numberIndex])}>
                                                {occurrences[numberIndex]}
                                            </td>
                                        );
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>

                {/* Tabela de análise dezenas Pares e Impares */}
                <div className="analise-impar-par">

                </div>
            </div>
        </section>
    );
};

export default Analise;
