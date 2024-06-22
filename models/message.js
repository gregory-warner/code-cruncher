import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db.js';
import Dialog from './dialog.js';

const Message = sequelize.define("message", {
    message_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "message_id",
    },
    dialog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "dialog_id",
        references: {
            model: Dialog,
            key: "dialog_id",
        }
    },
    messenger_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "messenger_id",
    },
    messenger_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "messenger_type_id",
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        field: "content",
    },
    data: {
        type: DataTypes.JSON,
        allowNull: true,
        field: "data",
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
    },
    is_locked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_locked",
    },

},{
    indexes: [
        {
            fields: ["dialog_id"],
            where: {
                is_deleted: false,
            },
            name: "idx_active_dialog_messages",
        },
        {
            fields: ["messenger_id", "messenger_type_id"],
            where: {
                is_deleted: false,
            },
            name: "idx_active_messenger_messages"
        }
    ]
});

export default Message;