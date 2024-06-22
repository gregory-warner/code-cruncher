import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db.js';

const Prompt = sequelize.define("prompt", {
    prompt_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "prompt_id",
    },
    actor_configuration_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "actor_configuration_id",
    },
    prompt: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        field: "prompt",
    },
    postfix: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        field: "postfix",
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
    fields: ["actor_configuration_id"],
    where: {
        is_deleted: false,
    },
    name: "idx_active_actor_configuration_prompt",
});

export default Prompt;