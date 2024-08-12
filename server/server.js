import logger from './log/logger.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import actorsRouter from './routes/actors.js';
import dialogsRouter from './routes/dialogs.js';
import messagesRouter from './routes/messages.js';
import userRouter from './routes/users.js';
import prompts from "./routes/prompts.js"
import fs from 'fs';
import path from 'path';
import multer from 'multer';

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


// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.use('/images', express.static(path.join(__dirname, 'uploads/img')));

app.use("/actors", actorsRouter);
app.use("/users", userRouter);
app.use("/dialogs", dialogsRouter);
app.use("/messages", messagesRouter);
app.use("/prompts", prompts);

app.use(errorHandler);

const port = process.env.VITE_SERVER_PORT;

app.listen(port, () => {
    logger.info(`server is running on port ${port}`);
});