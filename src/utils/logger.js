const { createLogger, transports, format } = require('winston');

// Define the logger
const logger = createLogger({
  level: 'info', // Default log level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: { service: 'kukwenda-api' }, // Add default metadata to logs
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    }),
    new transports.File({ filename: 'logs/combined.log' }), // Combined log file
  ],
});

// Add convenience methods for info, debug, error, and warn
logger.info = (message, meta = {}) => logger.log('info', message, meta);
logger.error = (message, meta = {}) => logger.log('error', message, meta);
logger.warn = (message, meta = {}) => logger.log('warn', message, meta);

// If not in production, log to the console with more detailed format
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = logger;
