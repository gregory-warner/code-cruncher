import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define("user", {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "user_id",
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user1",
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
    createdAt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Sequelize.literal("extract(epoch from now())"),
        field: "created_at",
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_deleted",
    }
});

export default User;