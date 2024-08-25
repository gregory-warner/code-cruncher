import {Actor, Message} from "../../../types";
import {messengerTypes} from "../../../utils/util";
import {ChatService} from "../types";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {openaiApi} from "../../../services/openai/openaiApi";
import {OpenAIMessage, OpenAIRequest, OpenAiResponse} from "../../../services/openai/types";

class OpenAIService implements ChatService {
    private actor: Actor;
    private api = openaiApi;

    constructor(actor: Actor) {
        this.actor = actor;
    }

    public formatMessages(messages: Message[]): OpenAIMessage[] {
        const promptMessage: OpenAIMessage  = {
            role: 'system',
            content: this.actor.prompt.prompt,
        };

        const formattedMessages: OpenAIMessage[] = messages.map(message => ({
            role: messengerTypes[message.messengerTypeId],
            content: message.content,
        }));

        return [
            promptMessage,
            ...formattedMessages,
        ];
    }

    public chat = (messages: Message[]): ThunkAction<any, any, any, AnyAction> => {
        const ollamaMessages = this.formatMessages(messages);
        const request: OpenAIRequest = {
            model: this.actor.aiModel.modelName,
            max_tokens: 4096, // todo: add this param
            temperature: 0.6, // todo: add param
            messages: ollamaMessages,
        };

        return this.api.endpoints.chat.initiate(request);
    }

    public getMessageResponse(response: OpenAiResponse, choiceIndex: number = 0): string {
        if (Array.isArray(response.choices) && response.choices.length === 0) {
            return 'Unable to get response';
        }

        return response.choices[choiceIndex].message.content;
    }
}

export default OpenAIService;