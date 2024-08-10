import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const ImageModel = sequelize.define('image_model', {
    imageModelId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'image_model_id',
    },
    modelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'model_id',
    },
    num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: 'num',
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '1024x1024',
        field: 'size',
    },
    quality: {
        type: DataTypes.ENUM('hd', 'standard'),
        allowNull: false,
        defaultValue: 'hd',
        field: 'quality',
    },
    style: {
        type: DataTypes.ENUM('natural', 'artistic'),
        allowNull: false,
        defaultValue: 'natural',
        field: 'style',
    },
});

export default ImageModel;