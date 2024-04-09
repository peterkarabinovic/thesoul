import pg from 'pg';
import { config } from '../config';


let db: pg.Pool;

export function dbpool(){
    if(!db){
        db = new pg.Pool({
            application_name: 'the-storeback',
            host: config.DB_HOST,
            port: config.DB_PORT,
            database: config.DB_DATABASE,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            connectionTimeoutMillis: 3000,
            idleTimeoutMillis: 5000,
            max: 10
        });
    }
    return db;
}

