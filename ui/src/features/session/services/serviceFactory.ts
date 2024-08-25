import {Actor} from "../../../types";
import OllamaService from "./OllamaService";
import {ChatService} from "../types";

export class ServiceFactory {
    public static create(actor: Actor): ChatService {
        switch (actor.aiModel.modelIdentifier) {
            case 'ollama':
                return new OllamaService(actor);
            default:
                throw new Error(`Unable to get model service for actor with id ${actor.actorId}`);
        }
    }
}
