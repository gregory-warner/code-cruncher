import {Actor, Message, MessageEventDetails} from "../../../types";
import {OllamaKeepAlive, OllamaMessage, OllamaRequest, OllamaResponse} from "../../../services/ollama/types";
import {messengerTypes} from "../../../utils/util";
import {ollamaApi} from "../../../services/ollama/ollamaApi";
import {ChatService} from "../types";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {MessageEventDetailsRequest} from "../../../services/server/types";

class OllamaService implements ChatService {
    private actor: Actor;
    private stream: boolean;
    private keepAlive?: 0|1|-1;
    private api = ollamaApi;

    private questionMessage: 'CODE CRUNCHER - QUESTION';

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

    public formatMessages(messages: Message[]): OllamaMessage[] {
        const promptMessage: OllamaMessage  = {
            role: 'system',
            content: this.actor.prompt.prompt,
        };

        const formattedMessages: OllamaMessage[] = messages.map(message => ({
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
        const request: OllamaRequest = {
            model: this.actor.aiModel.modelName,
            messages: ollamaMessages,
            stream: this.stream,
            keep_alive: this.keepAlive,
        };

        return this.api.endpoints.chat.initiate(request);
    }

    public isQuestion = (response: OllamaResponse): boolean => {
        return response.message.content.includes(this.questionMessage);
    }

    public handleMessageEventDetails = async (response: OllamaResponse): Promise<void> => {
        const content = response.message.content;
        const questionNumber = /QUESTION (\d+)/.exec(content)?.[1] ?? '0';
        const dataTypes = /Data Type\(s\): ([\w,\s]+)/.exec(content)?.[1] ?? '';

    }

    public getEventDetails = (messageId: number, response: OllamaResponse): MessageEventDetailsRequest => {
        const content = response.message.content;
        const questionId = parseInt(/QUESTION (\d+)/.exec(content)?.[1] ?? '0');

        return {
            messageId,
            questionId,
        }
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