import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const ImageModel = sequelize.define("image_model", {
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
    num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "num",
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '1024x1024',
        field: "size",
    },
    quality: {
        type: DataTypes.ENUM('hd', 'standard'),
        allowNull: false,
        defaultValue: 'hd',
        field: "quality",
    },
    style: {
        type: DataTypes.ENUM('natural', 'artistic'),
        allowNull: false,
        defaultValue: 'natural',
        field: "style",
    },
    isLocal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_local",
    }
});

export default ImageModel;