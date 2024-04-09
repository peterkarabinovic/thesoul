import { createServer, Server } from 'node:http';
import { promisify } from 'node:util';
import { Logger } from 'pino';
import { postgraphile } from 'postgraphile';
import { dbpool } from './infra';


let server: Server | null;

export async function startServer(port: number, logger: Logger){

    const middleware = postgraphile(

        dbpool(),
        'store',
        {
            pgSettings(req){
                // Adding this to ensure that all servers pass through the request in a
                // good enough way that we can extract headers.
                // CREATE FUNCTION current_user_id() RETURNS text AS $$ SELECT current_setting('graphile.test.x-user-id', TRUE); $$ LANGUAGE sql STABLE;
                return {
                    // `normalizedConnectionParams` comes from websocket connections, where
                    // the headers often cannot be customized by the client.

                    'graphile.test.x-user-id': req.headers['x-user-id'] || (req as any).normalizedConnectionParams?.['x-user-id'],
                };                
            },
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: true,
            subscriptions: true,
            dynamicJson: true,
            setofFunctionsContainNulls: false,
            ignoreRBAC: false,
            showErrorStack: 'json',
            extendedErrors: ['hint', 'detail', 'errcode'],
            allowExplain: true,
            legacyRelations: 'omit',
            sortExport: true,    
            graphiqlRoute: "/graphiql"        
        }
    );

    server = createServer(middleware);
    const listen = promisify(server.listen).bind(server);
    // @ts-ignore
    return await listen(port)
        .then(() => {
                if(!server)
                    return;
                logger.info(`PostGraphile listening on ${port} 🚀`);
                const address = server.address();
                if (typeof address !== 'string' && address !== null) {
                  const href = `http://localhost:${address.port}/graphiql'}`;
                  logger.info(`PostGraphiQL available at ${href} 🚀`);
                } else {
                  logger.info(`PostGraphile listening on ${address} 🚀`);
                }
            }
        )
}

export async function stopServer(){
    if(server) {
        const close = promisify(server.close).bind(server);
        return close().finally(() => server = null);
    }
}
