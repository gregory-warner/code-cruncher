import axios, { AxiosInstance } from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';

export enum ChatModel {
    CHAT_35_TURBO      = "gpt-3.5-turbo-0613",
    CHAT_35_TURBO_16K  = "gpt-3.5-turbo-16k",
    CHAT_4             = "gpt-4",
    CHAT_4_0614        = "gpt-4-0613",
}

export const chatCompletionPath = "chat/completions";
export const imageRequestPath = "images/generations";
export const models = "models"
export const legacyCompletionPath = "completions";

export const chatModels: Set<string> = new Set([
    "gpt-3.5-turbo",
    "gpt-4",
    "gpt-4-0613",
    "gpt-4-1106-preview",
    "gpt-4o",
    "gpt-4-turbo",
]);

export const legacyModels: Set<string> = new Set([
    "gpt-3.5-turbo-instruct", 
    "babbage-002",
    "davinci-002"
]);

export const imageModels: Set<string> = new Set([
    "dall-e-2",
    "dall-e-3",    
]);

export const visionModels: Set<string> = new Set([
    "gpt-4-vision-preview",
]);

export const validModels: Set<string> = new Set([
    ...chatModels,
    ...legacyModels,
    ...imageModels,
    ...visionModels,
]);

export const temperature = 0.6;

const httpsAgent = new SocksProxyAgent("socks://127.0.0.1:9050");

const client: AxiosInstance = axios.create({
    httpsAgent,
    baseURL: "https://api.openai.com/v1",
    headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
});

export const apiClient = client;
