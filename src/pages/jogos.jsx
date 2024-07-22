// Import Bibliotecas
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

// Import CSS
import "../style/jogos.css";

// Import Services API
import apiService from "../services/APIServices";

// Import Components


// Import Images
import Banner from "../assets/img/BannerLotofacil.png";
import { BsSearch, BsCalendar3, BsFillPiggyBankFill, BsFillPersonCheckFill, BsPlus } from "react-icons/bs";

const jogos = () => {
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
        <main id="jogos" >
            <section>
                <div className="ultimo-jogos">
                    {/* Buscar por sorteios */}
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

                    {/* Ultimo Sorteio */}
                    <div className="jogos-container">
                        <div className="sorteio-title">
                            <h2> <i><BsCalendar3 /></i>Último Sorteio - <span>{concurso.data}</span></h2>
                        </div>
                        <div className="sorteio-inform">
                            <div className="result">
                                <h3>
                                    Concurso: <span>{concurso.concurso}</span>
                                </h3>
                                <div className="dezenas">
                                    {concurso.dezenas && concurso.dezenas.map((dezena, index) => (
                                        <span key={index}>{dezena}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="container-info-dados">
                                <div className="container-left">
                                    <div className="info-dados">
                                        <h3>Gasto: <span>R$ 30,00</span></h3>
                                        <h3>Aposta <span>10</span></h3>
                                        <h3>Prêmio: <span>R$ 1.000.000,00</span></h3>
                                    </div>
                                </div>
                                <div className="container-right">
                                    <div className="info-dados">
                                        <h3> <i><BsFillPiggyBankFill /> </i>Estimativas de Premiação</h3>
                                        <div className="acertos">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>11</th>
                                                        <th>12</th>
                                                        <th>13</th>
                                                        <th>14</th>
                                                        <th>15</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>R$ 10,00</td>
                                                        <td>R$ 20,00</td>
                                                        <td>R$ 30,00</td>
                                                        <td>R$ 40,00</td>
                                                        <td>R$ 1.000.000,00</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Meus Bilhetes de jogos */}
                    <div className="bilhetes">
                        <h2> <i><BsFillPersonCheckFill /></i>Meus Bilhetes de Jogos</h2>
                        <div className="add-jogos">
                            <label htmlFor="Add-jogos">Adicione suas dezenas aqui!: </label>
                            <input id="Add-jogos" type="text" name="Adicionar" placeholder="Favor apenas numeros" />
                            <button> <i><BsPlus /></i>Adicionar</button>
                        </div>
                        <div className="container-scroll">
                            <div className="bilhete-left">
                                <span>Bilhetes</span>
                                <div className="container-bilhetes">

                                </div>
                            </div>

                            <div className="bilhete-right">
                                <div className="jogos-num">
                                    <h3>Jogos</h3>
                                    <h3>Meus Jogos e Premiaçoes </h3>
                                </div>
                                <div className="org-jogos">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>QNT. Dez</th>
                                                <th>Acertos</th>
                                                <th>Valor premiaçao</th>
                                                <th>Custo por Bilhete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>15</td>
                                                <td>15</td>
                                                <td>R$ 1.000.000,00</td>
                                                <td>R$ 3,50</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    )
}

export default jogos
