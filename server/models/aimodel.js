import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const AIModel = sequelize.define('ai_model', {
    modelId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'model_id',
    },
    modelTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'model_type_id',
        comment: 'used to distinguish the different model type e.g. language, image',
    },
    modelName: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
        field: 'model_name',
    },
    modelIdentifier: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '',
        field: 'model_identifier',
        comment: 'used to determine the owner or distributor of the model e.g. ollama, openai'
    },
    isLocal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_local',
    }
});

export default AIModel;