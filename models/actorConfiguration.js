import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db.js';
import Actor from './actor.js';

const ActorConfiguration = sequelize.define("actor_configuration", {
    actor_configuration_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "actor_configuration_id",
    },
    actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "active_actor_configuration",
        field: "actor_id",
        references: {
            model: Actor,
            key: "actor_id",
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
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "title",
    },
    prompt: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        field: "prompt",
    },
    chat_model: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "gpt-3.5-turbo-16k",
        field: "chat_model",
    },
    tts_model: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "tts_model",
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
            fields: ["actor_id"],
            where: {
                is_deleted: false,
            },
            name: "idx_active_actor_configuration",
        }
    ]
});

export default ActorConfiguration;