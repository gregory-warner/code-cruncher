import {Session} from '../models/models.js';

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
    return session;
}