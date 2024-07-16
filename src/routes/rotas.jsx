// Import Bibliotecas
import React from "react";
import { Route, Routes } from 'react-router-dom';

// Import Componentes
import Home from '../pages/home.jsx';
import AllResult from '../pages/AllResultLotofacil.jsx';


function rotas() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/AllResultLotofacil" element={<AllResult />} />
    </Routes>
  )
}

export default rotas