import * as winston from 'winston';
import {appName} from "../config";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: appName },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'errors.log', level:
                'error' }),
    ],
});

export default logger;
