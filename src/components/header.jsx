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

    useEffect(() => {
        apiService.getLatest() // Chama a API para pegar o último concurso
            .then(response => {
                console.log(response.data); // Exibe no console o retorno da API
                setConcurso(response.data); // Atualiza o estado do concurso
            })
            .catch(error => {
                console.error(error);
            });
    }, []); // Executa apenas uma vez

    return (
        <header>
            <div className="banner">
                <img src={Banner} alt="Banner Lotofácil" />
            </div>

            <div className="ultimo-sorteio">
                <h2>Último Sorteio</h2>
                <h3>
                    Concurso: <span>{concurso && concurso.concurso}</span> - <span>{concurso && concurso.data}</span>
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