import winston from 'winston';

const logger = winston.createLogger({
    level: "info", // Set the log level (options: error, warn, info, verbose, debug, silly)
    format: winston.format.json(), // Define the log format
    transports: [
      new winston.transports.Console(), // Log to console
      new winston.transports.File({ filename: "./log/error.log", level: "error" }) // Log to file
    ]
  });

export default logger;