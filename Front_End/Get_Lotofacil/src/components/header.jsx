// Import Bibliotecas
import React, { useState, useEffect } from "react";

// Import Services
import apiService from "../services/APIServices";

// Import Images
import Banner from "../assets/img/BannerLotofacil.png";

// Import CSS
import "../style/header.css";

const Header = () => {
    const [concurso, setConcurso] = useState({}); // Inicializa o estado do concurso

    useEffect(() => {
        apiService.getLatest()
            .then(response => {
                console.log(response.data); // Check the console output
                setConcurso(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

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