import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('lotofacil', 'root', 'Gkrb945965#', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log, // Habilita o logging de consultas SQL
});

export default sequelize;