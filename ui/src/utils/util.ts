import {Model} from "../services/ollama/types";
import {ChatApiModel} from "../services/openai/types";
import {Actor, User} from "../types";

export const getTimestamp = () => Math.floor(Date.now()/1000);

export const isFile = (file: unknown): file is File => file instanceof File;
export const isActor = (actor: Actor | User | null): actor is Actor => !!actor && 'actorId' in actor;
export const isOpenAiModel = (model: Model|ChatApiModel) => 'object' in model;
export const isOllamaModel = (model: Model|ChatApiModel) => 'digest' in model;
export const isUser = (user: User | Actor | null): user is User => !!user && 'userId' in user;

export const messengerTypeIds = {
    system: -1,
    user: 0,
    assistant: 1,
};

export const messengerTypes = Object.entries(messengerTypeIds).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});