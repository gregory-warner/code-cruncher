import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const messengerTypeId = {
    user: 0,
    actor: 1,
};

const Message = sequelize.define('message', {
    messageId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'message_id',
    },
    sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'session_id',
    },
    messageTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'message_type_id',
        commend: 'used to determine if the message type e.g. question, answer, general'
    },
    messageLinkId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'message_link_id',
        comment: 'used to link one message to another e.g. question to answers'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
        field: 'content',
    },
    data: {
        type: DataTypes.JSON,
        allowNull: true,
        field: 'data',
    },
    isLocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_locked',
        comment: 'used to prohibit the message from being deleted',
    },
    sessionParticipantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'session_participant_id',
    },
    messenger: {
        type: DataTypes.VIRTUAL,
    },
    messengerTypeId: {
        type: DataTypes.VIRTUAL,
    }
},{
    paranoid: true,
    timestamps: true,
    indexes: [
        {
            fields: ['session_id'],
            name: 'idx_active_session_messages',
        },
        {
            fields: ['session_participant_id'],
            name: 'idx_session_participant_messages'
        }
    ],
    hooks: {
        afterFind: findResult => {
            if (!Array.isArray(findResult)) findResult = [findResult];
            for (const instance of findResult) {
                if (instance.participant?.participantTypeId === messengerTypeId.user && instance.participant.user !== undefined) {
                    instance.messenger = instance.participant.user
                } else if (instance.participant?.participantTypeId === messengerTypeId.actor && instance.participant.actor !== undefined) {
                    instance.messenger = instance.participant.actor
                }

                instance.messengerTypeId = instance.participant?.participantTypeId ?? -1;

                // To prevent mistakes
                delete instance.participant;
                delete instance.dataValues.participant;
            }
        }
    },
});

export default Message;