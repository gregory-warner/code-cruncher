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

export interface PostChatParams {
    messages: ChatMessage[],
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