// Import Bibliotecas
import React, { useEffect, useState } from 'react';

// Import Hooks
import useFetchLotofacil from '../hooks/useFetchLotofacil';

// Import icons
import { BsGraphUpArrow } from "react-icons/bs";

// Import CSS
import '../style/analise.css';

const Analise = () => {
    const { results } = useFetchLotofacil(); // Chamando o hook para buscar os resultados da Lotofácil

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