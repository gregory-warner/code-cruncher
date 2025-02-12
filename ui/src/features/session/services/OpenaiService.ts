import {Actor, Message} from "../../../types";
import {messengerTypes} from "../../../utils/util";
import {ChatService} from "../types";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {openaiApi} from "../../../services/openai/openaiApi";
import {OpenAIMessage, OpenAIRequest, OpenAiResponse} from "../../../services/openai/types";
import {OllamaMessage} from "../../../services/ollama/types";

class OpenAIService implements ChatService {
    private actor: Actor;
    private api = openaiApi;

    constructor(actor: Actor) {
        this.actor = actor;
    }

    public formatMessages(messages: Message[]): OpenAIMessage[] {
        const formattedMessages: OpenAIMessage[] = messages.map(message => ({
            role: messengerTypes[message.messengerTypeId],
            content: message.content,
        }));

        if (this.actor.prompt.prompt) {
            return this.appendPrompt(formattedMessages);
        }

        return formattedMessages;
    }

    private appendPrompt(messages: OllamaMessage[]): OllamaMessage[] {
        const promptMessage: OllamaMessage  = {
            role: 'system',
            content: this.actor.prompt.prompt,
        };

        return [
            promptMessage,
            ...messages,
        ];
    }

    public chat = (messages: Message[]): ThunkAction<any, any, any, AnyAction> => {
        const ollamaMessages = this.formatMessages(messages);
        const request: OpenAIRequest = {
            model: this.actor.aiModel.modelName,
            // max_tokens: 4096, // todo: add this param , missing in o1
            max_completion_tokens: 4096, // for o1
            temperature: 1, // 0.6, // todo: add param only 1 supported with o1
            messages: ollamaMessages,
        };

        return this.api.endpoints.chat.initiate(request);
    }

    public getResponseContent(response: OpenAiResponse, choiceIndex: number = 0): string {
        if (Array.isArray(response.choices) && response.choices.length === 0) {
            return 'Unable to get response';
        }

        return response.choices[choiceIndex].message.content;
    }
}

export default OpenAIService;