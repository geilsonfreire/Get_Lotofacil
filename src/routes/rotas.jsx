// Import Bibliotecas
import React from "react";
import { Route, Routes } from 'react-router-dom';

// Import Componentes
import Home from '../pages/home.jsx';
import AllResult from '../pages/AllResultLotofacil.jsx';
import Analise from '../pages/analise.jsx';
import Jogos from '../pages/jogos.jsx';


function rotas() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AllResultLotofacil" element={<AllResult />} />
            <Route path="/analise" element={<Analise />} />
            <Route path="/jogos" element={<Jogos />} />
        </Routes>
    )
}

export default rotas