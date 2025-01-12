import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const MessageQuestionType = sequelize.define('message_question_type', {
    messageEventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'message_event_id',
        comment: 'references message_event_details.message_event_id'
    },
    questionType: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
        field: 'question_type',
    },
},{
    paranoid: true,
    timestamps: true,
});

export default MessageQuestionType;