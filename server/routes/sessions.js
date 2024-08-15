import express from 'express';
const router = express.Router();
import {
    createSession,
    deleteSession,
    getSessionById,
    updateSessionName,
    updateSessionTypeId
} from '../services/sessionService.js';
import {addSessionParticipant, getSessionParticipants} from "../services/sessionParticipantService.js";

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

router.post('/add-participant', async (req, res, next) => {
    try {
        const participant = await addSessionParticipant(req.body);
        return res.json(participant);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id/name', async (req, res, next) => {
    try {
        const session = await updateSessionName({ sessionId: req.params.id, sessionName: req.body.sessionName });
        return res.json(session);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id/typeId', async (req, res, next) => {
    try {
        const session = await updateSessionTypeId({ sessionId: req.params.id, sessionTypeId: req.body.sessionTypeId });
        return res.json(session);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const session = await deleteSession(req.params.id);
        return res.json(session);
    } catch (err) {
        next(err);
    }
});

export default router;
