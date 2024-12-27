import {ChatResponse} from "../../types";

export interface ChatApiModel {
    created: number,
    id: string,
    object: string,
    owned_by: string,
}

export interface GetModelResponse {
    object: 'list',
    data: ChatApiModel[],
}

export interface PostLegacyParams {
    prompt: string,
    model: string,
    max_tokens: number,
}

export interface OpenAIRequest {
    messages: OpenAIMessage[],
    model: string,
    max_tokens: number,
    temperature: number,
}

export interface PostImageParams {
    prompt: string,
    n: number,
    size: string,
    user: string,
    quality: string,
    style: string,
    model: number,
}

export interface OpenAIMessage {
    role: string;
    content: string;
    data?: {
        imageLinks?: string[];
    }
}

export interface ResponseChoice {
    message: OpenAIMessage,
    finish_reason: string,
    index: number,
}

export interface OpenAiResponse extends ChatResponse {
    status: number,
    choices: ResponseChoice[],
}

export interface OpenAiImage {
    revised_prompt: string;
    url: string;
}

export interface OpenAiImageResponse {
    created: number;
    data: OpenAIMessage[];
}