import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Actor from "./actor.js";

const Prompt = sequelize.define("prompt", {
    promptId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "prompt_id",
    },
    actorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Actor,
            key: 'actor_id',
        },
        field: 'actor_id',
        comment: 'references actors.actor_id',
    },
    promptName: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        field: "prompt_name",
    },
    prompt: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        field: "prompt",
        comment: 'used to add consistent information before a chain of messages'
    },
    postfix: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        field: "postfix",
        comment: 'used to add consistent information after a chain of messages'
    },
}, {
    paranoid: true,
    timestamps: true,
});

export default Prompt;