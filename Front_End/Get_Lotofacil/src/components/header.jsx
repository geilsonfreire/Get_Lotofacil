// Import Bibliotecas
import React, { useState, useEffect, useContext } from "react";


// Import icon img assets
import Banner from "../assets/img/BannerLotofacil.png";


// Import CSS
import "../style/header.css";

const header = () => {
    return (
        <header>
            <div className="banner">
                <img src={Banner} alt="" />
            </div>
            <div className="ultimo-sorteio">
                <h2>Último Sorteio</h2>
                <h3>Concurso: <span>3142</span> - <span> 01/01/2021</span></h3>
                <div className="sorteio">
                    <div className="dezenas">
                        <span>01</span>
                        <span>02</span>
                        <span>03</span>
                        <span>04</span>
                        <span>05</span>
                        <span>06</span>
                        <span>07</span>
                        <span>08</span>
                        <span>09</span>
                        <span>10</span>
                        <span>11</span>
                        <span>12</span>
                        <span>13</span>
                        <span>14</span>
                        <span>15</span>
                    </div>
                    <div className="data">  
                    </div>
                </div>
            </div>
        </header>
    )
}

export default header
