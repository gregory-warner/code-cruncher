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
import MessageEventDetails from "./messageEventDetails.js";
import MessageQuestionType from "./messageQuestionType.js";

Actor.belongsTo(AIModel, { foreignKey: 'model_id', as: 'aiModel' });

LanguageModel.belongsTo(AIModel, { foreignKey: 'model_id', constraints: false, scope: { model_type_id: 0 } });
ImageModel.belongsTo(AIModel, { foreignKey: 'model_id', constraints: false, scope: { model_type_id: 1 } });
TextModel.belongsTo(AIModel, { foreignKey: 'model_id', constraints: false, scope: { model_type_id: 2 } });

AIModel.hasOne(LanguageModel, { foreignKey: 'model_id', constraints: false, as: 'languageModel' });
AIModel.hasOne(ImageModel, { foreignKey: 'model_id', constraints: false, as: 'imageModel' });
AIModel.hasOne(TextModel, { foreignKey: 'model_id', constraints: false, as: 'textModel' });
AIModel.hasMany(Actor, { foreignKey: 'model_id', constraints: false });

SessionParticipant.belongsTo(Session, { foreignKey: 'session_id' });
Session.hasMany(SessionParticipant, { foreignKey: 'session_id', as: 'sessionParticipant' });
SessionParticipant.belongsTo(Session, { foreignKey: 'session_id' });
Session.hasMany(Message, { foreignKey: 'session_id', as: 'messages' });
Message.belongsTo(Session, { foreignKey: 'session_id' });

Actor.hasMany(Prompt, { foreignKey: 'actor_id' });
Prompt.belongsTo(Actor, { foreignKey: 'actor_id' });

Message.belongsTo(SessionParticipant, { foreignKey: 'session_participant_id', as: 'participant' });
SessionParticipant.hasMany(Message, { foreignKey: 'session_participant_id' });
SessionParticipant.belongsTo(User, { foreignKey: 'participant_id', constraints: false,  as: 'user' });
SessionParticipant.belongsTo(Actor, { foreignKey: 'participant_id', constraints: false, as: 'actor' });
User.hasMany(SessionParticipant, { foreignKey: 'participant_id', constraints: false, scope: { participantTypeId: 0 } });
Actor.hasMany(SessionParticipant, { foreignKey: 'participant_id', constraints: false, scope: { participantTypeId: 1 } });

Message.hasMany(MessageEventDetails, { foreignKey: 'message_id', allowNull: true, as: 'messageEventDetails'  });
MessageEventDetails.belongsTo(Message, { foreignKey: 'message_id'});

MessageEventDetails.hasMany(MessageQuestionType, { foreignKey: 'message_event_id'});
MessageQuestionType.belongsTo(MessageEventDetails, { foreignKey: 'message_event_id'});

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
    MessageEventDetails,
    MessageQuestionType
};
