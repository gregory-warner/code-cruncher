import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const TextModel = sequelize.define("text_model", {
    textModelId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "text_model_id",
    },
    modelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'model_id',
    },
    preset: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
        field: "preset",
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.6,
        field: 'temperature',
    },
    frequencyPenalty: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.5,
        field: 'frequency_penalty',
    },
});

export default TextModel;