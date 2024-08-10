import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const LanguageModel = sequelize.define('language_model', {
    languageModelId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'language_model_id',
    },
    modelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'model_id',
    },
    maxTokens: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4096,
        field: 'max_token',
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

export default LanguageModel;