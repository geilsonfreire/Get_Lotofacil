// Import Bibliotecas
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Import Services
import APIService from '../services/APIServices';

const useFetchLotofacil = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let toastId = null; // Variável para armazenar o id do toast

        const fetchResults = async () => {
            try {
                const response = await APIService.getLotofacil(); // Chamada da API
                setResults(response.data); // Atualiza o estado com os dados da API
                setLoading(false); // Desativa o loading

                if (!toastId) {
                    toastId = toast.info("Dados atualizados.", {
                        autoClose: 3000,
                        onClose: () => setLoading(false), // Desativa o loading
                    });
                } else {
                    setLoading(false); // Desativa o loading
                }
            } catch (error) {
                console.error("Erro ao carregar dados do concurso:", error); // Exibe o erro no console
                setError(error); // Atualiza o estado com o erro
                toast.error("Erro ao carregar dados do concurso."); // Exibe o erro em um toast
                setLoading(false); // Desativa o loading
            }
        };

        fetchResults(); // Chama a função fetchResults

        return () => {
            if (toastId) { // Verifica se o toastId é diferente de null
                toast.dismiss(toastId); // Fecha o toast
            }
        };
    }, []); 

    return { results, loading, error };
};

export default useFetchLotofacil;