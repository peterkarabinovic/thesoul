import { createServer, IncomingMessage, Server, ServerResponse } from 'node:http';
import express from 'express';
import { promisify } from 'node:util';
import { Logger } from 'pino';
import { postgraphile } from 'postgraphile';
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector"
import { appDbPool } from './infra';

const PostGraphileUploadFieldPlugin = require("./plugins/upload-field");
const { graphqlUploadExpress } = require("graphql-upload");
import {ImageUpload} from "./plugins/upload-images"


let server: Server | null;

export async function startServer(port: number, logger: Logger) {

    const middleware = postgraphile(
        appDbPool(),
        'store',
        {
            pgSettings(req) {
                // Adding this to ensure that all servers pass through the request in a
                // good enough way that we can extract headers.
                // CREATE FUNCTION current_user_id() RETURNS text AS $$ SELECT current_setting('graphile.test.x-user-id', TRUE); $$ LANGUAGE sql STABLE;
                return {
                    // `normalizedConnectionParams` comes from websocket connections, where
                    // the headers often cannot be customized by the client.
                    'role': req.headers['authorization'] || "guest",
                    'graphile.test.x-user-id': req.headers['x-user-id'] || (req as any).normalizedConnectionParams?.['x-user-id'],
                };
            },
            appendPlugins: [PgSimplifyInflectorPlugin, ImageUpload],
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
            graphileBuildOptions: {
                uploadFieldDefinitions: [
                    {
                        match: ({ schema, table, column, tags }: any) => {
                            if(column === "image_url" || column === "imageUrl")
                                console.log("uploadFieldDefinitions", {schema, table, column, tags});
                            return column === "image_url" || column === "imageUrl"
                        },
                        resolve: (d: any) => {
                            console.log("uploadFieldDefinitions", d);
                            return d;
                        },
                    }
                ]
            },

            // automatically omit fields that don't appear to be indexed.
            ignoreIndexes: false,

            graphiqlRoute: "/graphiql"
        }
    );


    const app = express();
    app.use(graphqlUploadExpress());
    app.use(middleware);

    const listen = promisify(app.listen).bind(app);
    // @ts-ignore
    server = await listen(port).then((address) => {

        const href = `http://localhost:${port}/graphiql`;
        logger.info(`PostGraphiQL available at ${href} 🚀`);
        // logger.info(`PostGraphile listening on ${address} 🚀`);
    });
    return server;
}

export async function stopServer() {
    if (server) {
        const close = promisify(server.close).bind(server);
        return close()
            .then(() => appDbPool().end())
            .finally(() => server = null);
    }
}
