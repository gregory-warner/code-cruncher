import {Actor, Message} from "../../../types";
import {OllamaKeepAlive, OllamaMessage, OllamaRequest, OllamaResponse} from "../../../services/ollama/types";
import {messengerTypes} from "../../../utils/util";
import {ollamaApi} from "../../../services/ollama/ollamaApi";
import {ChatService} from "../types";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";

class OllamaService implements ChatService {
    private actor: Actor;
    private stream: boolean;
    private keepAlive?: 0|1|-1;
    private api = ollamaApi;

    constructor(actor: Actor) {
        this.actor = actor;
        this.stream = false;
        this.keepAlive = 0;
    }

    public setStream(stream: boolean): void {
        this.stream = stream;
    }

    public setKeepAlive(keepAlive: OllamaKeepAlive): void {
       this.keepAlive = keepAlive;
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

    public formatMessages(messages: Message[]): OllamaMessage[] {
        const formattedMessages: OllamaMessage[] = messages.map(message => ({
            role: messengerTypes[message.messengerTypeId],
            content: message.content,
        }));

        if (this.actor.prompt.prompt) {
            return this.appendPrompt(formattedMessages);
        }

        return formattedMessages;
    }

    public chat = (messages: Message[]): ThunkAction<any, any, any, AnyAction> => {
        const ollamaMessages = this.formatMessages(messages);
        const request: OllamaRequest = {
            model: this.actor.aiModel.modelName,
            messages: ollamaMessages,
            stream: this.stream,
            keep_alive: this.keepAlive,
        };

        return this.api.endpoints.chat.initiate(request);
    }

    /**
     * Used to get the specific formatted message response
     *
     * @param response
     */
    public getResponseContent(response: OllamaResponse): string {
        return response.message.content;
    }
}

export default OllamaService;