import { config } from "./config";
import { logger } from "./infra";
import { startServer, stopServer } from "./server";


startServer(config.PORT, logger)
        .then( () => logger.info(`TheStoreBack started`) );

const terminate = () => {
    logger.info(`TheStoreBack shutting down...`);
    stopServer()
        .then(() => process.exit(0) )
        .catch(er => {
            logger.error(er);
            process.exit(1);
        });
};

process.on("SIGINT", terminate);
process.on("SIGTERM", terminate);
