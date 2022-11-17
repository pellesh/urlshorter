import express from "express";
import cookieParser from "cookie-parser";
import { initLinkRouter } from "./routes/linksRouter.js";
import { initRedirectRouter } from "./routes/redirectRouter.js";
import { initStatisticRouter } from "./routes/statisticRouter.js";
import { logger } from "./logging/log.js";
import { generateString } from './utils.js';
import cors from 'cors';

export const serverInit = (config) => {

    const checkSession = (req, res, next) => {
        let session = req.cookies.session;
        if (!session) {
            session = generateString(20);
            res.cookie('session', session);
            req.cookies.session = session;
        }
        next();
    }

    const server = express();
    server.use(cors(
        {
            credentials: true,
            origin: ["http://localhost", "http://127.0.0.1", "http://localhost:3000", "http://127.0.0.1:3000"]
        }
    ));
    server.use(express.json());
    server.use(cookieParser());
    server.use(checkSession);
    server.use(initLinkRouter());
    server.use(initStatisticRouter())
    server.use(initRedirectRouter());
    server.listen(config.port, () => {
        logger.info(`Server running at port: ${config.port}`);
    });
}
