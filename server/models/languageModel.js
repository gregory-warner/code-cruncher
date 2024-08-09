import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const LanguageModel = sequelize.define("language_model", {
    modelId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "model_id",
    },
    modelName: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        field: "model_name",
    },
    modelIdentifier: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
        field: "model_identifier",
    },
    maxTokens: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4096,
        field: "max_token",
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
    isLocal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_local",
    }
});

export default LanguageModel;