import {Message, Session, SessionParticipant} from '../models/models.js';
import {
    addDefaultParticipants,
    deleteSessionParticipants,
    getActiveSessionParticipants
} from "./sessionParticipantService.js";
import sequelize from "../db.js";

export const getSessionById = async (sessionId) => {
    const session = await Session.findByPk(sessionId);
    if (!session instanceof Session) {
        throw new Error(`Session with id ${sessionId} not found`);
    }

    return session;
};

export const validateSessionParameters = (session) => {
    if (!'sessionName' in session) {
        throw new Error(`Missing required data: sessionName`);
    }
    if (!'sessionTypeId' in session) {
        throw new Error(`Missing required data: sessionTypeId`);
    }
    if (!'createdBy' in session) {
        throw new Error(`Missing required data: createdBy`);
    }
};

export const createSession = async (sessionData) => {
    validateSessionParameters(sessionData);

    const session = await Session.create(sessionData);

    if (!session instanceof Session) {
        throw new Error(`Unable to create session`);
    }

    await addDefaultParticipants(session.sessionId);

    return session;
}

export const updateSessionName = async ({ sessionId, sessionName }) => {
    const session = await Session.findByPk(sessionId);
    if (!session) {
        throw new Error(`No session found with ID ${sessionId}`);
    }
    session.sessionName = sessionName;
    await session.save();
    return session;
}

export const updateSessionTypeId = async ({ sessionId, sessionTypeId }) => {
    const session = await Session.findByPk(sessionId);
    if (!session instanceof Session) {
        throw new Error(`No session found with ID ${sessionId}`);
    }
    session.sessionTypeId = sessionTypeId;
    await session.save();
    return session;
};

export const deleteSession = async (sessionId) => {
    const session = await Session.findByPk(sessionId);
    if (!session instanceof Session) {
        throw new Error(`No session found with ID ${sessionId}`);
    }

    await session.destroy();
    await deleteSessionParticipants(sessionId);
    return session;
};

export const getSessions = async () => {
    return await Session.findAll();
}

export const cloneSession = async (sessionId) => {
    const transaction = await sequelize.transaction();

    try {
        const session = await getSessionById(sessionId);

        const sessionClone = await Session.create({
            sessionName: `${session.sessionName}-clone`,
            sessionTypeId: session.sessionTypeId,
            createdBy: session.createdBy,
        });

        const newSessionId = sessionClone.sessionId;
        if (!newSessionId) {
            throw new Error(`No session found with ID ${sessionId}`);
        }

        const sessionParticipants = await getActiveSessionParticipants(sessionId);
        for (const participant of sessionParticipants) {
            const participantClone = await SessionParticipant.create({
                sessionId: newSessionId,
                participantId: participant.participantId,
                participantTypeId: participant.participantTypeId,
                participantSequenceId: participant.participantSequenceId,
            });
            if (!participantClone instanceof SessionParticipant) {
                throw new Error(`Unable to clone session participant for session id: ${sessionId}`);
            }
        }

        const messages = await Message.findAll({ where: { sessionId }, order: [['messageId', 'ASC']] });
        for (const message of messages) {
            const messageClone = await Message.create({
                sessionId: newSessionId,
                content: message.content,
                sessionParticipantId: message.sessionParticipantId
            });
            if (!messageClone instanceof Message) {
                throw new Error(`Unable to clone message for session id: ${sessionId}`);
            }
        }

        await transaction.commit();

        return sessionClone;
    } catch (err) {
        await transaction.rollback();
    }
}