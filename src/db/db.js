import { MongoClient } from 'mongodb';
import {logger} from '../logging/log.js';

class DataBase {

    _config = {
        host: 'localhost',
        port: 27017,
        username: '',
        password: ''
    }

    _client;
    _logger;
    _db;

    constructor(config = {}, logger = console) {
        this._logger = logger;
        this._config = config;
    }

    async connect(config = this._config) {
        this._config = config;
        this._logger.info(`Connecting MongoDB url: ${`mongodb://${this._config.host}:${this._config.port}`}`);
        this._client = new MongoClient(`mongodb://${this._config.host}:${this._config.port}`);
        this.db = await this._client.connect();
        this._logger.info('Connected to mongoDb');
    }


    async disconnect(){
        await this._db.disconnect();
        this._logger.info('Disconnected from mongoDb');
    }

    initDb(dbName = 'main') {
        this._db = this._client.db(dbName);
    }

    get DBO(){
        return this._db;
    }

    get client(){
        return this._client;
    }

}

export const dbStorage = new DataBase({}, logger);

