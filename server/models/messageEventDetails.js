import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const MessageEventDetails = sequelize.define('message_event_details', {
    messageEventId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'message_event_id',
    },
    messageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'message_id',
        comment: 'references messages.message_id'
    },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'question_id',
        comment: 'used for the question and the associated answer(s)'
    },
    resultId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'result_id',
        commend: '0 - incorrect, 1 - correct, 2 - partially correct'
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'duration',
        comment: 'time taken, in seconds, to submit the answer'
    },
},{
    indexes: [
        {
            fields: ['question_id', 'result_id'],
            name: 'idx_quest_result',
        },
    ],
});

export default MessageEventDetails;