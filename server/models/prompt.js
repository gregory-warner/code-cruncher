import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db.js';

const Prompt = sequelize.define("prompt", {
    promptId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "prompt_id",
    },
    promptName: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        field: "prompt_name",
    },
    prompt: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        field: "prompt",
        comment: 'used to add consistent information before a chain of messages'
    },
    postfix: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        field: "postfix",
        comment: 'used to add consistent information after a chain of messages'
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_deleted",
    }
});

export default Prompt;