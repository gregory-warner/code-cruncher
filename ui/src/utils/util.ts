import {Model} from "../services/ollama/types";
import {ChatApiModel} from "../services/openai/types";
import {Actor, User} from "../types";

export const getTimestamp = () => Math.floor(Date.now()/1000);

export const isFile = (file: unknown): file is File => file instanceof File;
export const isActor = (actor: Actor | null): actor is Actor => actor && typeof actor !== 'undefined';
export const isOpenAiModel = (model: Model|ChatApiModel) => 'object' in model;
export const isOllamaModel = (model: Model|ChatApiModel) => 'digest' in model;
export const isUser = (user: User | null): user is User => user && typeof user !== 'undefined';

export const messengerTypeIds = {
    user: 0,
    assistant: 1,
};

export const messengerTypes = Object.entries(messengerTypeIds).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});