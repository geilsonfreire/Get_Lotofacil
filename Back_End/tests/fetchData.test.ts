// tests/fetchData.test.ts
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from '../src/config/db';
import Routes from '../src/routes/route';
import { describe, beforeAll, it, expect, afterAll } from '@jest/globals';


// Configuração da aplicação para testes
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', Routes);

describe('Testando a atualização dos dados da Lotofacil', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // Limpa e recria o banco de dados antes dos testes
  });

  it('deve atualizar os dados da Lotofacil com sucesso', async () => {
    // Simula uma chamada à rota que usa fetchAndSaveAllLotofacilData
    const response = await request(app).post('/api/fetch-data');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Todos os dados salvos com sucesso!');
  });

  afterAll(async () => {
    await sequelize.close(); // Fechar conexão com o banco de dados após os testes
  });
});
