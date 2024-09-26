import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const participantTypeId = {
    user: 0,
    actor: 1,
};

const SessionParticipant = sequelize.define('session_participant', {
    sessionParticipantId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'session_participant_id',
    },
    sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'session_id',
    },
    participantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'participant_id',
        comment: 'used to determine the id or the user or actor based on the participant type id'
    },
    participantTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'participant_type_id',
        comment: 'used to distinguish between different participants e.g. 0 for user, 1 for actor'
    },
    participantSequenceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'participant_sequence_id',
        comment: 'used to determine the expected speaker sequence in the session'
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'created_by',
    },
    participant: {
        type: DataTypes.VIRTUAL,
    }
}, {
    paranoid: true,
    timestamps: true,
    indexes: [
        {
            fields: ['session_id']
        }
    ],
    hooks: {
        afterFind: findResult => {
            if (!Array.isArray(findResult)) findResult = [findResult];
            for (const instance of findResult) {
                if (instance.participantTypeId === participantTypeId.user && instance.userParticipant !== undefined) {
                    instance.participant = instance.userParticipant;
                } else if (instance.participantTypeId === participantTypeId.actor && instance.actorParticipant !== undefined) {
                    instance.participant = instance.actorParticipant;
                }
                // To prevent mistakes
                delete instance.userParticipant;
                delete instance.dataValues.userParticipant;
                delete instance.actorParticipant;
                delete instance.dataValues.actorParticipant;
            }
        }
    },
});

export default SessionParticipant;