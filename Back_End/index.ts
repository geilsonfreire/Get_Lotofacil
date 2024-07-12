import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './src/config/db';
import Routes from './src/routes/route';

const app = express(); // Inicialização do servidor Express
const port = 3000; // Porta padrão

// Middleware para analisar dados de formulário
app.use(express.json()); // Middleware para analisar dados JSON

// Middleware para analisar dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do CORS para permitir requisições de http://localhost:5173 e http://localhost:3000
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Use as rotas definidas para '/api'
app.use('/api', Routes);

// Utilização das mesmas rotas também em '/lotofacil'
app.use('/lotofacil', Routes);

// Iniciar o servidor
app.listen(port, async () => {
    console.log(`Servidor rodando na porta ${port}`);

    // Conexão com o banco de dados
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
});

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Exportar o servidor Express configurado
export default app;