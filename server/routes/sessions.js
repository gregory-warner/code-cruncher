import express from 'express';
const router = express.Router();
import {createSession, getSessionById, getSessionParticipants} from '../services/sessionService.js';

router.post('/create', async (req, res, next) => {
    try {
        const session = await createSession(req.body);
        return res.json({session});
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const session = await getSessionById(req.params.id);
        return res.json(session);
    } catch (err) {
        next(err);
    }
});

router.get('/:id/participants', async (req, res, next) => {
    try {
        const participants = await getSessionParticipants(req.params.id);
        return res.json(participants);
    } catch (err) {
        next(err);
    }
});

export default router;
