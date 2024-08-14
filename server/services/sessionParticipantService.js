import {Actor, SessionParticipant, User} from "../models/models.js";

const sessionParticipantType = {
    0: 'user',
    1: 'actor',
};

export const getSessionParticipants = async (sessionId) => {
    const participants = await SessionParticipant.findAll({
        where: { session_id: sessionId },
        include: [
            { model: Actor, as: 'actor' },
            { model: User, as: 'user' }
        ]
    });

    return participants.map(participant => participant[sessionParticipantType[participant.participantTypeId]]);
};

export const addSessionParticipant = async (sessionParticipant) => {
    const requiredKeys = ['sessionId', 'participantId', 'participantTypeId'];
    if (!requiredKeys.every(key => key in sessionParticipant)) {
        throw new Error(`
            invalid parameters supplied, 
            entry requires ${requiredKeys.join(', ')},
            keys passed in: ${Object.keys(sessionParticipant).join(', ')}`);
    }

    const count = await SessionParticipant.count({
        where: {
            sessionId: sessionParticipant.sessionId,
        }
    });
    sessionParticipant.participantSequence = count + 1;

    const participant = await SessionParticipant.create(sessionParticipant);
    if (!participant instanceof SessionParticipant) {
        throw new Error(`Unable to add session participant for session id ${sessionParticipant.sessionId}`);
    }

    return participant;
};