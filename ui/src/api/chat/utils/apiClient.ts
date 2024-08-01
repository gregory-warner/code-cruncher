import axios, { AxiosInstance } from 'axios';

export const chatCompletionPath = "chat/completions";
export const imageRequestPath = "images/generations";
export const models = "models"
export const legacyCompletionPath = "completions";

export const legacyModels: Set<string> = new Set([
    "gpt-3.5-turbo-instruct", 
    "babbage-002",
    "davinci-002"
]);

export const imageModels: Set<string> = new Set([
    "dall-e-2",
    "dall-e-3",    
]);

const client: AxiosInstance = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
});

export const apiClient = client;
