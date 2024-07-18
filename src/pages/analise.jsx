// Import Bibliotecas
import React, { } from 'react';

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

    // Chama a função para contar as ocorrências de 1 a 25
    const N1 = countOccurrencesOfNumber(1);
    const N2 = countOccurrencesOfNumber(2);
    const N3 = countOccurrencesOfNumber(3);
    const N4 = countOccurrencesOfNumber(4);
    const N5 = countOccurrencesOfNumber(5);
    const N6 = countOccurrencesOfNumber(6);
    const N7 = countOccurrencesOfNumber(7);
    const N8 = countOccurrencesOfNumber(8);
    const N9 = countOccurrencesOfNumber(9);
    const N10 = countOccurrencesOfNumber(10);
    const N11 = countOccurrencesOfNumber(11);
    const N12 = countOccurrencesOfNumber(12);
    const N13 = countOccurrencesOfNumber(13);
    const N14 = countOccurrencesOfNumber(14);
    const N15 = countOccurrencesOfNumber(15);
    const N16 = countOccurrencesOfNumber(16);
    const N17 = countOccurrencesOfNumber(17);
    const N18 = countOccurrencesOfNumber(18);
    const N19 = countOccurrencesOfNumber(19);
    const N20 = countOccurrencesOfNumber(20);
    const N21 = countOccurrencesOfNumber(21);
    const N22 = countOccurrencesOfNumber(22);
    const N23 = countOccurrencesOfNumber(23);
    const N24 = countOccurrencesOfNumber(24);
    const N25 = countOccurrencesOfNumber(25);

    return (
        <section className='analise'>
            <h2><i><BsGraphUpArrow /></i> Análise Estatística</h2>
            <table>
                <thead>
                    <tr>
                        <th><span>DEZ/</span>-01</th>
                        <th><span>DEZ/</span>-02</th>
                        <th><span>DEZ/</span>-03</th>
                        <th><span>DEZ/</span>-04</th>
                        <th><span>DEZ/</span>-05</th>

                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>{N1}</td>
                        <td>{N2}</td>
                        <td>{N3}</td>
                        <td>{N4}</td>
                        <td>{N5}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};

export default Analise;