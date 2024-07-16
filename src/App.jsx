// Import Bibliotecas
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

// Import Componentes
import Rotas from './routes/rotas.jsx'
import Menu from './components/menu.jsx'

// Import CSS
import './style/global.css'

const App = () => {
    return (
        <Router>
            <div className="app-conatiner-geral">
                <Menu />
                <div className="app-container-home">
                    <Rotas />
                </div>
            </div>
        </Router>
    )
}

export default App