import pg from 'pg';
import { config } from '../config';


let _appDbPool: pg.Pool;
let _migrationDbPool: pg.Pool;

export function appDbPool(){
    if(!_appDbPool)
        _appDbPool = _createDbPool(config.APPLICATION_DB_USER, config.APPLICATION_DB_PASSWORD);
    return _appDbPool;
}

export function migrationDbPool(){
    if(!_migrationDbPool)
        _migrationDbPool = _createDbPool(config.MIGRATION_DB_USER||"", config.MIGRATION_DB_PASSWORD||"");
    return _migrationDbPool;
}

function _createDbPool(user: string, password: string){
    return new pg.Pool({
        application_name: 'the-storeback',
        host: config.DB_HOST,
        port: config.DB_PORT,
        database: config.DB_DATABASE,
        user: user,
        password: password,
        connectionTimeoutMillis: 3000,
        idleTimeoutMillis: 5000,
        max: 10
    });
}


