import {Actor, AIModel, Prompt, SessionParticipant, User} from "../models/models.js";
import {getFirstUser} from "./userService.js";

const sessionParticipantType = {
    0: 'user',
    1: 'actor',
};

const sessionParticipant = Object.entries(sessionParticipantType).reduce((acc, [key, value]) => {
    acc[value] = parseInt(key);
    return acc;
}, {});

export const getSessionParticipants = async (sessionId) => {
    return await SessionParticipant.findAll({
        where: { session_id: sessionId },
        include: [
            {
                model: Actor,
                as: 'actor',
                paranoid: false,
                include: [
                    { model: Prompt, as: 'prompt', required: true, paranoid: false },
                    { model: AIModel, as: 'aiModel', required: false },
                ]
            },
            { model: User, as: 'user' }
        ],
        order: [['participantSequenceId', 'ASC']],
    });
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
    sessionParticipant.participantSequenceId = count + 1;

    const participant = await SessionParticipant.create(sessionParticipant);

    if (!participant instanceof SessionParticipant) {
        throw new Error(`Unable to add session participant for session id ${sessionParticipant.sessionId}`);
    }

    const participantType = getSessionParticipantTypeModel(sessionParticipant.participantTypeId);
    return await SessionParticipant.findByPk(participant.participantId, {
        include: [
            { model: participantType.model, as: participantType.alias },
        ]
    });
};

const getSessionParticipantTypeModel = (participantTypeId) => {
    switch (participantTypeId) {
        case 0:
            return { model: User, alias: 'user' };
        case 1:
            return { model: Actor, alias: 'actor' };
        default:
            throw new Error(`Unknown participant type with id ${participantTypeId}`);
    }
};

export const deleteSessionParticipants = async (sessionId) => {
    return await SessionParticipant.destroy({
        where: {
            sessionId,
        },
    });
}

/**
 * adds the first user and actor to the session
 *
 * @param sessionId
 * @returns {Promise<void>}
 */
export const addDefaultParticipants = async (sessionId) => {
    const user = await getFirstUser();
    const userParticipant = await addSessionParticipant({
        sessionId,
        participantId: user.userId,
        participantTypeId: sessionParticipant.user,
    })
    // const actor = await getFirstActor();
    // const actorParticipant = await addSessionParticipant({
    //     sessionId,
    //     participantId: actor.actorId,
    //     participantTypeId: sessionParticipant.actor,
    // })
};