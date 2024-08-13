import logger from './log/logger.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import actorsRouter from './routes/actors.js';
import messagesRouter from './routes/messages.js';
import userRouter from './routes/users.js';
import sessionRouter from './routes/sessions.js';
import prompts from "./routes/prompts.js"
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(bodyParser.json());
app.use(cors());

const errorHandler = (err, req, res, next) => {
    console.error(err.stack ?? "Server Error");
    logger.error(err.stack);

    res.status(500).json({ error: err.message });
};

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.use('/images', express.static(path.join(__dirname, 'uploads/img')));

app.use("/actors", actorsRouter);
app.use("/users", userRouter);
app.use("/messages", messagesRouter);
app.use("/prompts", prompts);
app.use("/sessions", sessionRouter);

app.use(errorHandler);

const port = process.env.VITE_SERVER_PORT;

app.listen(port, () => {
    logger.info(`server is running on port ${port}`);
});