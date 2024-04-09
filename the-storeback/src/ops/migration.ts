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
import Postgrator from 'postgrator';
import { config } from '../config';
import { dbpool, logger } from '../infra';



export async function migrate(){
    logger.info('Migration Schema ...');
    const db = dbpool();
    const client = await db.connect();

    try {
        const postgrator = new Postgrator({
            migrationPattern: path.join(__dirname, '..', 'schema', '*.sql'),
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
    finally{
        client.release();
    }
    logger.info('Migration Schema done');
    process.exit(0);
}


// 👇 this check like python __name__ == '__main__':
if(require.main === module) {

    migrate().catch((er) => {
        logger.error(er);
        process.exit(1);
    });
}
  








