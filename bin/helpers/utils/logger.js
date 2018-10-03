
const winston = require('winston');
const path = require('path');
const sentryLog = require('../components/sentry/sentry_log');

winston.emitErrs = true;

const logDir = 'logs';

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: path.join(logDir, '/all-logs.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      createDirectory: true
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

const log = (context, message, scope) => {
  const obj = {
    context,
    message,
    scope
  };
  sentryLog.sendError(obj);
  logger.info(obj);
};

module.exports = {
  log
};
