import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

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
},{
    paranoid: true,
    timestamps: true,
    indexes: [
        {
            fields: ['session_id'],
            name: 'idx_active_session_messages',
        },
        {
            fields: ['messenger_id'],
            name: 'idx_active_messenger_messages'
        }
    ]
});

export default Message;