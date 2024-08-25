import Actor from './actor.js';
import Message from './message.js';
import User from './user.js';
import Prompt from './prompt.js';
import SessionParticipant from "./sessionParticipant.js";
import Session from "./session.js";
import ImageModel from "./imageModel.js";
import TextModel from "./textModel.js";
import LanguageModel from "./languageModel.js";
import AIModel from "./aimodel.js";

Actor.belongsTo(Prompt, { foreignKey: 'prompt_id' });
Actor.belongsTo(AIModel, { foreignKey: 'model_id', as: 'aiModel' });

LanguageModel.belongsTo(AIModel, { foreignKey: 'model_id', constraints: false, scope: { model_type_id: 0 } });
ImageModel.belongsTo(AIModel, { foreignKey: 'model_id', constraints: false, scope: { model_type_id: 1 } });
TextModel.belongsTo(AIModel, { foreignKey: 'model_id', constraints: false, scope: { model_type_id: 2 } });

AIModel.hasOne(LanguageModel, { foreignKey: 'model_id', constraints: false, as: 'languageModel' });
AIModel.hasOne(ImageModel, { foreignKey: 'model_id', constraints: false, as: 'imageModel' });
AIModel.hasOne(TextModel, { foreignKey: 'model_id', constraints: false, as: 'textModel' });
AIModel.hasMany(Actor, { foreignKey: 'model_id', constraints: false });

SessionParticipant.belongsTo(Session, { foreignKey: 'session_id' });
SessionParticipant.belongsTo(User, { foreignKey: 'participant_id', constraints: false,  as: 'user' });
SessionParticipant.belongsTo(Actor, { foreignKey: 'participant_id', constraints: false, as: 'actor' });

Session.hasMany(SessionParticipant, { foreignKey: 'session_id', as: 'sessionParticipant' });
SessionParticipant.belongsTo(Session, { foreignKey: 'session_id' });
Session.hasMany(Message, { foreignKey: 'session_id' });
Message.belongsTo(Session, { foreignKey: 'session_id' });

Prompt.hasOne(Actor, { foreignKey: 'prompt_id' });
Actor.belongsTo(Prompt, { foreignKey: 'prompt_id', constraints: false });

User.hasMany(Message, { foreignKey: 'messenger_id' });
Actor.hasMany(Message, { foreignKey: 'messenger_id' });
Message.belongsTo(User, { foreignKey: 'messenger_id', constraints: false });
Message.belongsTo(Actor, { foreignKey: 'messenger_id', constraints: false });

Message.belongsTo(Message, { foreignKey: 'message_link_id', constraints: false  });
Message.hasMany(Message, { foreignKey: 'message_link_id', constraints: false  });

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
    AIModel,
};
