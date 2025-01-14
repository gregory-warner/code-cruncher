import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const MessageQuestionType = sequelize.define('message_question_type', {
    messageQuestionTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'message_question_type_id',
    },
    messageEventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'message_event_id',
        comment: 'references message_event_details.message_event_id'
    },
    questionType: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'question_type',
    },
},{
    paranoid: true,
    timestamps: true,
});

export default MessageQuestionType;