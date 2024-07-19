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

    // Função para contar números pares e ímpares em um concurso
    const countEvenOdd = (dezenas) => {
        const evenOddCount = { even: 0, odd: 0 }; // Inicializa o contador de pares e ímpares
        dezenas.forEach(dezena => {
            if (Number(dezena) % 2 === 0) { // Se o número for par
                evenOddCount.even += 1; // Incrementa o contador de pares
            } else {
                evenOddCount.odd += 1; // Incrementa o contador de ímpares
            }
        });
        return evenOddCount; // Retorna o contador de pares e ímpares
    };

    // Função para encontrar o número par e ímpar mais frequentes em todos os resultados
    const getMostFrequentEvenOdd = () => {
        const evenOccurrences = {};
        const oddOccurrences = {};

        // Conta a frequência de cada número par e ímpar
        results.forEach(result => {
            result.dezenas.forEach(dezena => {
                const num = Number(dezena);
                if (num % 2 === 0) {
                    evenOccurrences[num] = (evenOccurrences[num] || 0) + 1;
                } else {
                    oddOccurrences[num] = (oddOccurrences[num] || 0) + 1;
                }
            });
        });

        // Inicializa variáveis para armazenar o número mais frequente e a contagem máxima
        let mostFrequentEven = null;
        let mostFrequentOdd = null;
        let maxEvenCount = 0;
        let maxOddCount = 0;

        // Determina o número par mais frequente
        for (const [num, count] of Object.entries(evenOccurrences)) {
            if (count > maxEvenCount) {
                maxEvenCount = count;
                mostFrequentEven = num;
            }
        }

        // Determina o número ímpar mais frequente
        for (const [num, count] of Object.entries(oddOccurrences)) {
            if (count > maxOddCount) {
                maxOddCount = count;
                mostFrequentOdd = num;
            }
        }

        return { mostFrequentEven, mostFrequentOdd };
    };

    const { mostFrequentEven, mostFrequentOdd } = getMostFrequentEvenOdd(); // Obtém os números mais frequentes

    // Função para contar a frequência dos números pares e ímpares entre todos os concursos
    const getFrequencyOfEvenOddCounts = () => {
        const evenCounts = {};
        const oddCounts = {};

        // Conta a frequência dos números pares e ímpares em cada concurso
        results.forEach(result => {
            const { even, odd } = countEvenOdd(result.dezenas);

            // Conta a frequência dos números pares
            if (evenCounts[even] === undefined) {
                evenCounts[even] = 1;
            } else {
                evenCounts[even] += 1;
            }

            // Conta a frequência dos números ímpares
            if (oddCounts[odd] === undefined) {
                oddCounts[odd] = 1;
            } else {
                oddCounts[odd] += 1;
            }
        });

        // Inicializa variáveis para armazenar o número par e ímpar mais frequentes
        let mostFrequentEvenCount = null;
        let mostFrequentOddCount = null;
        let maxEvenCount = 0;
        let maxOddCount = 0;

        // Determina o número de pares mais frequente
        for (const [count, frequency] of Object.entries(evenCounts)) {
            if (frequency > maxEvenCount) {
                maxEvenCount = frequency;
                mostFrequentEvenCount = count;
            }
        }

        // Determina o número de ímpares mais frequente
        for (const [count, frequency] of Object.entries(oddCounts)) {
            if (frequency > maxOddCount) {
                maxOddCount = frequency;
                mostFrequentOddCount = count;
            }
        }

        return { mostFrequentEvenCount, mostFrequentOddCount };
    };

    // Obtém o número de pares e ímpares mais frequentes
    const { mostFrequentEvenCount, mostFrequentOddCount } = getFrequencyOfEvenOddCounts();

    return (
        <section className='analise'>
            <h2><i><BsGraphUpArrow /></i> Análise Estatística</h2>
            <div className="conatiner-tabelas">

                {/* Tabela de análise dezenas Quent e Frias */}
                <div className="container-tabela left">
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

                    {/* Tabela de análise da frequencia do número par e ímpar */}
                    <div className="container-tabela">
                        <h3>Número Par e Ímpar mais Frequentes</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Mais Frequente</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Pares</th>
                                    <td>{mostFrequentEven}</td>
                                </tr>
                                <tr>
                                    <th>Ímpares</th>
                                    <td>{mostFrequentOdd}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabela de análise dezenas Pares e Ímpares */}
                <div className="container-tabela right">
                    <div className="container-impar-par">
                        <h3>Analise da Dez Pares / Ímpares</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Concurso</th>
                                    <th>Pares</th>
                                    <th>Ímpares</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(result => {
                                    const { even, odd } = countEvenOdd(result.dezenas);
                                    return (
                                        <tr key={result.concurso}>
                                            <td>{result.concurso}</td>
                                            <td>{even}</td>
                                            <td>{odd}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Tabela de análise da frequencia do número par e ímpar */}
                    <div className="container-tabela">
                        <h3>Número Par e Ímpar mais Frequentes</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Mais Frequente</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Pares</th>
                                    <td>{mostFrequentEvenCount}</td>
                                </tr>
                                <tr>
                                    <th>Ímpares</th>
                                    <td>{mostFrequentOddCount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="analise-probabilidades">
                <h2><i><BsGraphUpArrow /></i> Análise Probabilidades</h2>
            </div>

        </section>
    );
};

export default Analise;
