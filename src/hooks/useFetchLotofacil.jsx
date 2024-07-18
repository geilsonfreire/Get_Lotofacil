import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import APIService from '../services/APIServices';

const useFetchLotofacil = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let toastId = null;

        const fetchResults = async () => {
            try {
                const response = await APIService.getLotofacil();
                setResults(response.data);
                setLoading(false);

                if (!toastId) {
                    toastId = toast.info("Dados atualizados.", {
                        autoClose: 3000,
                        onClose: () => setLoading(false),
                    });
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error("Erro ao carregar dados do concurso:", error);
                setError(error);
                toast.error("Erro ao carregar dados do concurso.");
                setLoading(false);
            }
        };

        fetchResults();

        return () => {
            if (toastId) {
                toast.dismiss(toastId);
            }
        };
    }, [error]);

    return { results, loading, error };
};

export default useFetchLotofacil;