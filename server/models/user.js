import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define("user", {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "user_id",
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
    time_created: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Sequelize.literal("extract(epoch from now())"),
        field: "time_created",
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_deleted",
    }
});

export default User;