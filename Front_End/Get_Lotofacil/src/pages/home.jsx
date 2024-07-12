// Import Bibliotecas
import React from 'react'

// Import CSS
import "../style/home.css";

// Import Components
import Header from "../components/header.jsx";
import AllResultLotofacil from '../components/AllResultLotofacil.jsx';

const Home = () => {
    return (
        <div>
            <Header />
            <AllResultLotofacil />
        </div>
    )
};

export default Home
