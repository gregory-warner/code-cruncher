import logger from './log/logger.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import actorsRouter from './routes/actors.js';
import messagesRouter from './routes/messages.js';
import userRouter from './routes/users.js';
import sessionRouter from './routes/sessions.js';
import prompts from "./routes/prompts.js"
import modelRouter from "./routes/models.js";
import messageEventDetailsRouter from './routes/messageEventDetails.js';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'uploads/img')));

app.use("/actors", actorsRouter);
app.use("/users", userRouter);
app.use("/messages", messagesRouter);
app.use("/prompts", prompts);
app.use("/sessions", sessionRouter);
app.use("/models", modelRouter);
app.use("/message-event-details", messageEventDetailsRouter);

const errorHandler = (err, req, res, next) => {
    console.error(err.stack ?? "Server Error");
    logger.error(err.stack);

    res.status(500).json({ error: err.message });
};

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.use(errorHandler);

const port = process.env.VITE_SERVER_PORT;

app.listen(port, () => {
    logger.info(`server is running on port ${port}`);
});