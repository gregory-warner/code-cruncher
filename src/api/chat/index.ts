import {ApiLegacyChatResponse, ApiResponse} from './types';
import {
    apiClient,
    chatCompletionPath,
    ChatModel,
    imageModels,
    imageRequestPath,
    legacyCompletionPath,
    legacyModels,
} from './utils/apiClient';

export interface PostChatParams {
    chatMessages: ChatMessage[],
    chatModel?: string,
    maxTokens?: number,
    temperature?: string,
}

interface ImageLinkResponse {
    url: string,
}

export const postChatRequest = async (postChatParams: PostChatParams): Promise<ChatMessage|null> => {
    if (legacyModels.has(postChatParams.chatModel)) {
        return await postLegacyChat(postChatParams);
    }

    if (imageModels.has(postChatParams.chatModel)) {
        return await postImageRequest(postChatParams);
    }

    return await postChat(postChatParams);
}

export const postLegacyChat = async (postChatParams: PostChatParams): Promise<ChatMessage> => {
    const prompt = postChatParams.chatMessages.reduce((acc, curr) => acc + curr.content + ".. ", "");

    const params = {
        prompt,
        model: postChatParams.chatModel || ChatModel.CHAT_35_TURBO_16K,
        max_tokens: postChatParams.maxTokens || 3000,
    }

    const response = await apiClient.post<ApiLegacyChatResponse>(legacyCompletionPath, params);
    console.log("response: ", response);
    return {role: "assistant", content: response.data.choices[0]?.text ?? "No text"};
}; 

export const postChat = async (postChatParams: PostChatParams): Promise<ChatMessage> => {
    const params = {
        messages: postChatParams.chatMessages,
        model: postChatParams.chatModel || ChatModel.CHAT_35_TURBO_16K,
        max_tokens: postChatParams.maxTokens || 4096,
        temperature: postChatParams.temperature || 0.6,
        frequency_penalty: 1
    }

    const response = await apiClient.post<ApiResponse>(chatCompletionPath, params);
    console.log("response: ", response);
    return response.data.choices[0]?.message ?? {role: "default", content: ""};
}; 

export const postImageRequest = async (postChatParams: PostChatParams): Promise<ChatMessage> => {
    const recentRequest = postChatParams.chatMessages[postChatParams.chatMessages.length-1];

    const params = {
        prompt: recentRequest.content,
        n: 1,
        size: "1024x1024",
        user: "Gee",
        quality: "hd",
        style: "natural",
        model: "dall-e-3",
    };

    const response = await apiClient.post(imageRequestPath, params);
    console.log("Response: ", response);

    const imageResponses: ImageLinkResponse[] = response.data?.data ?? [];
    const imageLinks = imageResponses.map(image => image.url);

    return {
        role: 'assistant', 
        content: 'Image Rendered',
        data: {
            imageLinks,
        }
    };
}