import Actor from './actor.js';
import Message from './message.js';
import User from './user.js';
import ActorConfiguration from './actorConfiguration.js';
import Prompt from './prompt.js';
import SessionParticipant from "./sessionParticipant.js";
import Session from "./session.js";

Actor.hasOne(ActorConfiguration, {
    foreignKey: "actor_id", 
    as: "configuration"
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

SessionParticipant.belongsTo(Session, { foreignKey: 'session_id' });
SessionParticipant.belongsTo(User, { foreignKey: 'participant_id', constraints: false, scope: { participant_type_id: 0 } });
SessionParticipant.belongsTo(Actor, { foreignKey: 'participant_id', constraints: false, scope: { participant_type_id: 1 } });

export {
    Actor,
    ActorConfiguration,
    User,
    Message,
    Prompt,
    SessionParticipant,
    Session,
};
