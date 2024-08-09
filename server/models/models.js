import Actor from './actor.js';
import Message from './message.js';
import User from './user.js';
import Prompt from './prompt.js';
import SessionParticipant from "./sessionParticipant.js";
import Session from "./session.js";
import ImageModel from "./imageModel.js";
import TextModel from "./textModel.js";
import LanguageModel from "./languageModel.js";

SessionParticipant.belongsTo(Session, { foreignKey: 'session_id' });
SessionParticipant.belongsTo(User, { foreignKey: 'participant_id', constraints: false, scope: { participant_type_id: 0 } });
SessionParticipant.belongsTo(Actor, { foreignKey: 'participant_id', constraints: false, scope: { participant_type_id: 1 } });

export {
    Actor,
    User,
    Message,
    Prompt,
    SessionParticipant,
    Session,
    ImageModel,
    TextModel,
    LanguageModel,
};
