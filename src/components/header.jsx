// Import Bibliotecas
import React, { useState, useEffect } from "react";

// Import Services API
import apiService from "../services/APIServices";

// Import Images
import Banner from "../assets/img/BannerLotofacil.png";


// Import CSS
import "../style/header.css";

const Header = () => {
    const [concurso, setConcurso] = useState({}); // Inicializa o estado do concurso
    const [isLoading, setIsLoading] = useState(true); // Inicializa o estado de carregamento

    useEffect(() => {
        apiService.getLatest() // Chama a API para pegar o último concurso
            .then(response => {
                console.log(response.data); // Exibe no console o retorno da API
                setConcurso(response.data); // Atualiza o estado do concurso
                setIsLoading(false); // Atualiza o estado de carregamento
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false); // Atualiza o estado de carregamento mesmo em caso de erro
            });
    }, []); // Executa apenas uma vez

    if (isLoading) {
        return <div>Carregando...</div>; // Exibe mensagem de carregamento enquanto os dados estão sendo buscados
    }

    if (!concurso) {
        return <div>Erro ao carregar dados.</div>; // Exibe mensagem de erro se os dados não forem carregados
    }

    return (
        <header>

            <div className="ultimo-sorteio">
                <img src={Banner} alt="Banner Lotofácil" />
                <h2>Último Sorteio  - <span>{concurso && concurso.data}</span></h2>
                <h3>
                    Concurso: <span>{concurso && concurso.concurso}</span>
                    <p>Ganhadores:
                        <span>
                            {concurso.localGanhadores && concurso.localGanhadores.length > 0
                                ? `Ganhadores: ${concurso.localGanhadores.length}`
                                : `Acumulou: ${concurso.acumulou ? 'Sim' : 'Não'}`}
                        </span>
                    </p>
                    <p>Local do sorteio:<span>{concurso.local}</span></p>
                </h3>
                <div className="sorteio">
                    <div className="dezenas">
                        {concurso && concurso.dezenas && concurso.dezenas.map((dezena, index) => (
                            <span key={index}>{dezena}</span>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;