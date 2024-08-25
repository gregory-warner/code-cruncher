import {Actor} from "../../../types";
import OllamaService from "./OllamaService";
import {ChatService} from "../types";
import OpenAIService from "./OpenaiService";

export class ServiceFactory {
    public static create(actor: Actor): ChatService {
        switch (actor.aiModel.modelIdentifier) {
            case 'ollama':
                return new OllamaService(actor);
            case 'openai':
                return new OpenAIService(actor);
            default:
                throw new Error(`Unable to get model service for actor with id ${actor.actorId}`);
        }
    }
}
