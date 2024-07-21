// Import Bibliotecas
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

// Import icon, img assets
import Logo from "../assets/img/lotofacil.png";

// Import CSS
import "../style/menu.css";

// Import icon
import {
    FaHome,
    FaWallet,
    FaChartLine,
    FaRegClock,
    FaCog,
    FaSignOutAlt,
    FaCanadianMapleLeaf
} from "react-icons/fa";

const Menu = () => {

    useEffect(() => {
        const mainMenuLi = document.getElementById("mainMenu").querySelectorAll("li");

        function changeActive() { /* função para mudar a classe active */
            mainMenuLi.forEach(n => n.classList.remove("active")); /* removendo a classe active */
            this.classList.add("active"); /* adicionando a classe active */
        };
        mainMenuLi.forEach((n) => n.addEventListener("click", changeActive)); /* adicionando evento de click */
    }, []);


  return (
      <nav>
          <Link to="/">
              <img src={Logo} alt="Logo da pagina" />
          </Link>

          <ul id="mainMenu">
              <Icon to="/" icon={<FaHome />} title="Home" /> 
              <Icon to="/AllResultLotofacil" icon={<FaRegClock />} title="Historico de Resultados" /> 
              <Icon to="/analise" icon={<FaChartLine />} title="Analise Statistico" /> 
              <Icon to="/jogos" icon={<FaCanadianMapleLeaf />} title="Jogada da sorte" /> 
              <Icon to="#" icon={<FaWallet />} title="Carteira" />
          </ul>
          <ul className="lasttMenu">
              <Icon to="#" icon={<FaCog />} title="Configurações" /> {/* page Settings */}
              <Icon to="#" icon={<FaSignOutAlt />} title="Sair" onClick={""} /> {/* page Logout */}
          </ul>
      </nav>
  )
}

const Icon = ({ to, icon, title, onClick }) => ( // Icon component
    <li>
        <Link to={to} title={title} onClick={onClick} >
            {icon}
        </Link>
    </li>
);

export default Menu
