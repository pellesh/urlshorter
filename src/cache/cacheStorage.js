
import { createClient } from 'redis';
import { logger } from '../logging/log.js'

class RedisStorage {

    _client;
    _logger;
    _config;

    constructor(config = {}, logger = console) {
        this._config = config;
        this._logger = logger;
    }

    async connect(config) {
        this._config = config;
        this._client = createClient(this._config);
        this._client.on('error', (err) => this._logger.error('Redis Client Error ' + err.message));
        this._client.on('connect', () => this._logger.info('Redis connected'));
        await this._client.connect();
    }

    async disconnect() {
        await this._client.disconnect();
    }

    get client(){
        return this._client;
    }
}

export const redisStorage = new RedisStorage({}, logger);