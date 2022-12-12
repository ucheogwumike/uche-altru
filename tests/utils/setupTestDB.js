const Sequelize = require('sequelize');
const config = require('../../src/config/config');
const logger = require('../../src/config/logger');

const sequelizeInstance = new Sequelize(config.sequelize.url);

const setupTestDB = () => {
  beforeAll(async () => {
    // await sequelizeInstance.dropAllSchemas();
    await sequelizeInstance
      .authenticate()
      .then(() => logger.info('DB connected'))
      .catch((err) => {
        logger.error(err);
      });
  });
  afterAll(async () => {
    await sequelizeInstance.close();
  });
};

module.exports = setupTestDB;
