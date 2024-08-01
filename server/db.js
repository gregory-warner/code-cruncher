import { Sequelize } from 'sequelize';
import logger from './log/logger.js';

const config = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWD
};

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

sequelize.authenticate()
  .then(logger.info("sequelize running"))
  .catch(e=>logger.error("error ->", e));

export default sequelize;