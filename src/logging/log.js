import winston from 'winston';
import 'winston-mongodb';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const logger = winston.createLogger({

    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'server' },
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: __dirname + '/logs/error.log', maxSize:'10MB',level: 'error' }),
        new winston.transports.File({ filename: __dirname + '/logs/logs.log', maxSize:'10MB' }),
    ],
});

