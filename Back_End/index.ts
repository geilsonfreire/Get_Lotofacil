import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './src/config/db';
import LotofacilRoutes from './src/routes/lotofacilRoute';

const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.json());

// Middleware para analisar dados URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Use as rotas definidas
app.use('/api', LotofacilRoutes);


// Utilização das rotas
app.use('/lotofacil', LotofacilRoutes);

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

// Exportar o servidor Express configurado
export default app;