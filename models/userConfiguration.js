import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db.js';
import User from './user.js';

const UserConfiguration = sequelize.define("user_configuration", {
    user_configuration_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "user_configuration_id",
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "active_user_configuration",
        field: "user_id",
        references: {
            model: User,
            key: "user_id",
        }
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "avatar",
    },
    color_theme: {
        type: DataTypes.JSON,
        allowNull: true,
        field: "color_theme",
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
}, {
    indexes: [
        {
            unique: true,
            fields: ["user_id"],
            where: {
                is_deleted: false,
            },
            name: "idx_active_user_configuration",
        }
    ]
});

export default UserConfiguration;