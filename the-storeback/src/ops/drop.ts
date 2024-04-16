/*
    Description: 
    ------------
    This script is used to drop the store schema.

    Usage:
    ------
    To run this script, execute the following command:
    ```
        yarn op:drop
    ```
*/

import readline from 'node:readline';
import { migrationDbPool } from "../infra";

export async function dropStoreSchema() {
    const db = migrationDbPool();
    await db.query('DROP SCHEMA IF EXISTS store CASCADE');
}

if (require.main === module) {
    // const rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });
    // console.log('Are you sure you want to drop the store schema? (yes/no):');
    // rl.question('', async (answer) => {
    //     if (answer === 'yes') {
            dropStoreSchema().catch((er) => {
                console.error(er);
                process.exit(1);
            });
    //     }
    //     rl.close();
    // });
}