interface Message {
    role: string,
    content: string,
    timestamp: EpochTimeStamp,
}

interface ResponseChoice {
    message: Message,
    finish_reason: string,
    index: number,
}

export interface ApiResponse {
    status: number,
    choices: ResponseChoice[],
}

type LegacyChatResponseChoice = {
    index: number,
    text: string,
    finish_reason: string,
}

export interface ApiLegacyChatResponse {
    status: number,
    choices: LegacyChatResponseChoice,
}

export type Messages = {
    messages: Message[],
};

export type PostSizeOptions = {
    size: number;
};

