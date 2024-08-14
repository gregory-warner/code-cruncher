import {Session} from '../models/models.js';

export const getSessionById = async (sessionId) => {
    const session = await Session.findByPk(sessionId);
    if (!session instanceof Session) {
        throw new Error(`Session with id ${sessionId} not found`);
    }

    return session;
};

export const createSession = async (sessionData) => {
    console.log(sessionData);
    if (!'sessionName' in sessionData || !'sessionTypeId' in sessionData || !'createdBy' in sessionData) {
        throw new Error(`Session creation missing required data: sessionName, sessionTypeId, createdBy`);
    }

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