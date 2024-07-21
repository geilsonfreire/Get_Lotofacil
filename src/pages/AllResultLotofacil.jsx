// Import Bibliotecas
import React, { useState } from 'react';

// Import Hooks
import useFetchLotofacil from '../hooks/useFetchLotofacil';

//  icons
import { BsCardList, BsCaretLeftFill, BsCaretRightFill} from "react-icons/bs";

// Import CSS
import '../style/AllResults.css';

const AllResultLotofacil = () => {
    const [isSorted, setIsSorted] = useState(false); // Novo estado para controle da ordenação
    const [sortDirection, setSortDirection] = useState(''); // Novo estado para direção da ordenação
    const { results } = useFetchLotofacil(); // Chamando o hook para buscar os resultados



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
        <main>
            <div className="all-results">
                <h1><i><BsCardList /></i> Resultados da Lotofácil</h1>
                <div className="filter">
                    <h2>Filtrar por maior e menor:</h2>
                    <div className="filter-button">
                        <button onClick={() => sortResults('maior')}> <i><BsCaretLeftFill /></i> </button>
                        <button onClick={() => sortResults('menor')}> <i><BsCaretRightFill /></i></button>
                    </div>
                </div>
                <div className="scroll-result">
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
            </div>
        </main>
    );
};

export default AllResultLotofacil;


