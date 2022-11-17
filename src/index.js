import { logger } from "./logging/log.js";
import { serverInit } from "./server.js";
import dotenv from 'dotenv';
import { dbStorage } from "./db/db.js";
import { redisStorage } from './cache/cacheStorage.js'
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV == 'DOCKER') {
    dotenv.config({ path: __dirname + '/../.env' });
} else {
    dotenv.config({ path: __dirname + '/../.env.local' });
}


async function start() {

    try {

        await dbStorage.connect({
            host: process.env.MONGO_HOST || 'localhost',
            port: process.env.MONGO_PORT || 27017
        });
        dbStorage.initDb('main');

        logger.add(new winston.transports.MongoDB({ db: dbStorage.client, dbName: 'logs' }));

        let redisConf = {
            url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
        }
        if (process.env.REDIS_PASSWORD)
            redisConf.password = process.env.REDIS_PASSWORD;
        await redisStorage.connect(redisConf);

        serverInit({ port: process.env.EXPRESS_PORT || 3001 });
    } catch (err) {
        logger.error(err.message);
    }


}

start();