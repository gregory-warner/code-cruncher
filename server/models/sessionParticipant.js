import { DataTypes, Sequelize } from 'sequelize';
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
    },
    participantTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'participant_type_id',
    },
    createdDate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Sequelize.literal('extract(epoch from now())'),
        field: 'created_date',
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'created_by',
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_deleted',
    }
}, {
    indexes: [
        {
            fields: ['sessionId']
        }
    ]
});

export default SessionParticipant;