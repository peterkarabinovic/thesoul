/*
    Description: 
    ------------
    This script is used to migrate the store schema.

    Usage:
    ------
    To run this script, execute the following command:
    ```
        yarn op:migrate
    ```
*/
import * as path from 'node:path';
import pg from 'pg';
import Postgrator from 'postgrator';
import { config } from '../config';
import { migrationDbPool, logger } from '../infra';



export async function migrate(){
    logger.info('Migration Schema ...');
    const db = migrationDbPool();
    const client = await db.connect();


    try {
        await runMigrateForPath(client, path.join(__dirname, '..', 'schema', '*', '*.sql') )
        // await runMigrateForPath(client, path.join(__dirname, '..', 'schema', 'products', '*.sql') )
        //     const postgrator = new Postgrator({
        //     migrationPattern: path.join(__dirname, '..', 'schema', '*.sql'),
        //     driver: 'pg',
        //     database: config.DB_DATABASE,
        //     schemaTable: `store._migrations`,
        //     execQuery: (query) => {
        //         query = replaceEnvVars(query);
        //         return db.query(query)
        //             .catch((er) => {
        //                 logger.error( query.trim().split('\n').splice(0, 2).join("\n"));
        //                 throw er;
        //             });
        //     },
        //     newline: 'LF'
        // });
        
        // await postgrator.migrate();

        // for postgresql, we need to set the comment on the table to avoid it being included in the introspection
        await client.query("COMMENT ON TABLE store._migrations IS '@omit';")

        // set appuser password
        await client.query(`ALTER ROLE ${config.APPLICATION_DB_USER} WITH LOGIN PASSWORD '${config.APPLICATION_DB_PASSWORD}';`);
    }
    finally{
        client.release();
    }
    logger.info('Migration Schema done');
    process.exit(0);
}


async function runMigrateForPath(db: pg.PoolClient, path: string){
    const postgrator = new Postgrator({
        migrationPattern: path,
        driver: 'pg',
        database: config.DB_DATABASE,
        schemaTable: `store._migrations`,
        execQuery: (query) => {
            return db.query(query)
                .catch((er) => {
                    logger.error( query.trim().split('\n').splice(0, 2).join("\n"));
                    throw er;
                });
        },
        newline: 'LF'
    });
    
    await postgrator.migrate();
}



// 👇 this check like python __name__ == '__main__':
if(require.main === module) {

    migrate().catch((er) => {
        logger.error(er);
        process.exit(1);
    });
}
  








