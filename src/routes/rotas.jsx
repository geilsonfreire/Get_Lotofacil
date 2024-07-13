// Import Bibliotecas
import React from "react";
import { Route, Routes } from 'react-router-dom';

// Import Componentes
import Home from '../pages/home.jsx';


function rotas() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default rotas