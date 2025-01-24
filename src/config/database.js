const { Sequelize } = require('sequelize');
const config = require('./config'); 
const logger = require('../utils/logger');

// Determine environment
const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

// Initialize Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging || console.log, // Log SQL queries in development
    pool: {
      max: 5, // Maximum number of connections in pool
      min: 0, // Minimum number of connections in pool
      acquire: 30000, // Maximum time, in ms, to acquire a connection
      idle: 10000, // Maximum time, in ms, that a connection can be idle before being released
    },
  }
);

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection to the database has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1); // Exit with failure
  }
})();

// Export Sequelize instance for use in models and migrations
module.exports = sequelize;
