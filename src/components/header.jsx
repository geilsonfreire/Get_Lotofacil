// Import Bibliotecas
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

// Import Services API
import apiService from "../services/APIServices";

// Import Images
import Banner from "../assets/img/BannerLotofacil.png";
import { BsSearch } from "react-icons/bs";
import { FiAward } from "react-icons/fi";


// Import CSS
import 'react-toastify/dist/ReactToastify.css';
import "../style/header.css";

const Header = () => {
    const [concurso, setConcurso] = useState({}); // Inicializa o estado do concurso
    const [isLoading, setIsLoading] = useState(false); // Inicializa o estado de carregamento
    const [numeroConcurso, setNumeroConcurso] = useState(""); // Estado para o número do concurso digitado pelo usuário


    useEffect(() => {
        let toastId = null; // Variável para armazenar o ID do toast

        // Função para buscar os dados do concurso pelo número inserido
        const fetchLatestConcurso = async () => {
            try {
                setIsLoading(true); // Define o estado de carregamento como verdadeiro
                const response = await apiService.getLatest(); // Chama a API para pegar o último concurso
                console.log(response.data); // Exibe no console o retorno da API
                setConcurso(response.data); // Atualiza o estado do concurso com os novos dados obtidos

                // Exibe o toast apenas se ainda não estiver sendo exibido
                if (!toastId) {
                    toastId = toast.info("Dados atualizados.", {
                        autoClose: 3000, // Fechar automaticamente após 3 segundos
                        onClose: () => setIsLoading(false), // Quando fechar, atualiza o estado de carregamento
                        toastClassName: 'custom-toast' // Classe CSS para personalizar o toast
                    });
                } else {
                    setIsLoading(false); // Finaliza o estado de carregamento
                }

            } catch (error) {
                console.error("Erro ao carregar dados do concurso:", error);
                toast.error("Erro ao carregar dados do concurso.");
                setIsLoading(false); // Finaliza o estado de carregamento em caso de erro
            }
        };

        fetchLatestConcurso(); // Chama a função para buscar os dados do concurso

        return () => {
            if (toastId) {
                toast.dismiss(toastId); // Fecha o toast se o componente for desmontado antes do tempo definido
            }
        };
    }, []); // Executa sempre que o número do concurso mudar


    // Função para buscar os dados do concurso pelo número inserido
    const fetchConcursoByNumero = async () => {
        try {
            setIsLoading(true); // Define o estado de carregamento como verdadeiro
            const response = await apiService.getConcurso(numeroConcurso); // Chama a API para pegar o concurso pelo número
            console.log(response.data); // Exibe no console o retorno da API
            setConcurso(response.data); // Atualiza o estado do concurso com os novos dados obtidos

            toast.info("Dados atualizados.", {
                autoClose: 3000, // Fechar automaticamente após 3 segundos
                onClose: () => setIsLoading(false), // Quando fechar, atualiza o estado de carregamento
                toastClassName: 'custom-toast' // Classe CSS para personalizar o toast
            });

        } catch (error) {
            console.error("Erro ao carregar dados do concurso:", error);
            toast.error("Erro ao carregar dados do concurso.");
            setIsLoading(false); // Finaliza o estado de carregamento em caso de erro
        }
    };

    // Função para lidar com o clique no botão de busca
    const handleSearchClick = () => {
        if (numeroConcurso.trim() !== "") {
            fetchConcursoByNumero();
        } else {
            toast.warn("Por favor, digite o número do concurso.");
        }
    };

    // Função para lidar com a mudança no campo de entrada
    const handleNumeroConcursoChange = (event) => {
        setNumeroConcurso(event.target.value);
    };


    return (
        <main>
            <ToastContainer />

            <div className="ultimo-sorteio">
                <div className="Busca">
                    <img src={Banner} alt="Banner Lotofácil" />

                    <div className="input-Busca">
                        <label htmlFor="Concurso">Concurso: </label>
                        <input
                            id="Concurso"
                            type="text"
                            value={numeroConcurso}
                            onChange={handleNumeroConcursoChange}
                            placeholder="Digite o número do concurso..."
                        />
                        <button onClick={handleSearchClick}>
                            <BsSearch /> Busca
                        </button>

                    </div>
                </div>

                <div className="sorteio-container">
                    <div className="sorteio-date">
                        <h2>Último Sorteio - <span>{concurso.data}</span></h2>
                    </div>
                    <div className="sorteio-info">
                        <h3>
                            Concurso: <span>{concurso.concurso}</span>
                        </h3>
                        <h3>
                            Ganhadores:
                            <span>
                                {concurso.localGanhadores && concurso.localGanhadores.length > 0
                                    ? `${concurso.localGanhadores.length}` : "Acumulou!"
                                }
                            </span>
                        </h3>
                        <h3>Local do sorteio: <span>{concurso.local}</span></h3>
                    </div>
                    <div className="sorteio">
                        <div className="dezenas">
                            {concurso.dezenas && concurso.dezenas.map((dezena, index) => (
                                <span key={index}>{dezena}</span>
                            ))}
                        </div>
                    </div>
                    <div className="premio-container">
                        <h2><i><FiAward /></i>Premiação</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th>Acertos</th>
                                    <th>Ganhadores</th>
                                    <th>Premio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {concurso.premiacoes && concurso.premiacoes.map((premio, index) => (
                                    <tr key={index}>
                                        <td>{premio.descricao}</td>
                                        <td>{premio.ganhadores}</td>
                                        <td>{premio.valorPremio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default Header;