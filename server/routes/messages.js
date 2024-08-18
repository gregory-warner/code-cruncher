import express from 'express';
const router = express.Router();
import {createMessage, deleteMessage, getMessages, getMessenger, updateMessage} from '../services/messagesService.js';

router.get('/:sessionId', async (req, res, next) => {
    try {
        const messages = await getMessages(req.params.sessionId);
        return res.json(messages);
    } catch (err) {
        next(err);
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const message = await createMessage(req.body.message);
        return res.json(message.get({plain: true}));
    } catch (error) {
        next(`Unable to add message: ${error}`);
    }
});

router.get('/get-messenger/:messengerId', async (req, res, next) => {
    try {
        const messengerId = parseInt(req.params.messengerId) ?? 0;
        const messengerTypeId = parseInt(req.query.messengerTypeId) ?? 0;
        const messenger = await getMessenger(messengerId, messengerTypeId);
        return res.json(messenger);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const message = await deleteMessage(req.params.id);
        return res.json(message.get({plain: true}));
    } catch (err) {
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const message = await updateMessage(req.body);
        return res.json(message);
    } catch (err) {
        next(err);
    }
});

export default router;