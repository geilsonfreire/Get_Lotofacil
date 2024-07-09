import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('lotofacil', 'root', 'Gkrb945965#', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

export default sequelize;