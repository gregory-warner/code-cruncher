import Actor from './actor.js';
import Dialog from './dialog.js';
import Message from './message.js';
import User from './user.js';
import ActorConfiguration from './actorConfiguration.js';
import UserConfiguration from './userConfiguration.js';
import Prompt from './prompt.js';

export const messengerTypeIds = {
    user: 0,
    assistant: 1,
};

export const messengerTypes = Object.entries(messengerTypeIds).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});

Actor.hasOne(ActorConfiguration, {
    foreignKey: "actor_id", 
    as: "configuration"
});

Actor.hasMany(Dialog, {
    foreignKey: "actor_id", 
    targetKey: "actor_id"
});

Dialog.hasMany(Message, {
    foreignKey: "dialog_id",
    targetKey: "dialog_id"
});

Dialog.hasMany(Actor, {
    foreignKey: "actor_id", 
    targetKey: "actor_id"
});

Dialog.hasMany(User, {
    foreignKey: "user_id", 
    targetKey: "user_id"
});

Message.belongsTo(Dialog, {
    foreignKey: "dialog_id",
    targetKey: "dialog_id"
});

User.hasOne(UserConfiguration, {
    foreignKey: "user_id", 
    as: "configuration"
});

User.hasMany(Dialog, {
    foreignKey: "user_id", 
    targetKey: "user_id"
});

UserConfiguration.belongsTo(User, {
    foreignKey: "user_id", 
    targetKey: "user_id"
});

ActorConfiguration.hasMany(Prompt, {
    foreignKey: "actor_configuration_id",
    targetKey: "actor_configuration_id",
    as: "prompts",
});

Prompt.belongsTo(ActorConfiguration, {
    foreignKey: 'actor_configuration_id',
    as: 'actor_prompt',
});

export {
    Actor,
    ActorConfiguration,
    User,
    UserConfiguration,
    Dialog,
    Message,
    Prompt,
};
