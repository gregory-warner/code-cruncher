import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

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
}, {
    paranoid: true,
    timestamps: true,
    indexes: [
        {
            fields: ['session_id']
        }
    ]
});

export default SessionParticipant;