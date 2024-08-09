import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db.js';

const Actor = sequelize.define("actor", {
    actorId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "actor_id",
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "name",
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "default_username",
        field: "username",
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "avatar",
    },
    colorTheme: {
        type: DataTypes.JSON,
        allowNull: true,
        field: "color_theme",
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "title",
    },
    promptId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "prompt_id",
    },
    modelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "model_id",
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_deleted",
    }
});

export default Actor;