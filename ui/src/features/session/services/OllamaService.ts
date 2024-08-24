import {Actor, Message} from "../../../types";
import {OllamaKeepAlive, OllamaMessage, OllamaRequest, OllamaResponse} from "../../../services/ollama/types";
import {messengerTypes} from "../../../utils/util";
import {ollamaApi} from "../../../services/ollama/ollamaApi";

class OllamaService {
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

    public async formatMessages(messages: Message[]): Promise<OllamaMessage[]> {
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

    public async chat(messages: Message[]): Promise<OllamaResponse> {
        try {
            const ollamaMessages = await this.formatMessages(messages);
            const request: OllamaRequest = {
                model: this.actor.aiModel.modelName,
                messages: ollamaMessages,
                stream: this.stream,
                keep_alive: this.keepAlive,
            }

            const apiResponse = await this.api.endpoints.chat.initiate(request);
            // @ts-ignore
            return apiResponse.data as OllamaResponse;
        } catch (error) {
            console.log(error);
        }
    }
}

export default OllamaService;