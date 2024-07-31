import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db.js';

const Dialog = sequelize.define("dialog", {
    dialog_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "dialog_id",
    },
    dialog_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Untitled',
        field: "dialog_name"
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
            model: "users",
            key: "user_id",
        },
    },
    actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "actor_id",
        references: {
            model: "actors",
            key: "actor_id",
        },
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
            unique: false,
            fields: ['actor_id', 'user_id']
        }
    ]

});

export default Dialog;