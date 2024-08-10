import { DataTypes } from 'sequelize';
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
}, {
    paranoid: true,
});

export default User;