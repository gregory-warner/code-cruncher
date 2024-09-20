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
    messengerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'messenger_id',
        comment: 'used as the primary key of the messenger e.g. actorId, userId'
    },
    messengerTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'messenger_type_id',
        comment: 'used to distinguish the messenger type e.g. user, actor'
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
    messenger: {
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
            fields: ['messenger_id', 'messenger_type_id'],
            name: 'idx_active_messenger_messages'
        }
    ],
    hooks: {
        afterFind: findResult => {
            if (!Array.isArray(findResult)) findResult = [findResult];
            for (const instance of findResult) {
                if (instance.messengerTypeId === messengerTypeId.user && instance.user !== undefined) {
                    instance.messenger = instance.user;
                } else if (instance.messengerTypeId === messengerTypeId.actor && instance.actor !== undefined) {
                    instance.messenger = instance.actor;
                }
                // // To prevent mistakes:
                delete instance.user;
                delete instance.dataValues.user;
                delete instance.actor;
                delete instance.dataValues.actor;
            }
        }
    },
});

export default Message;