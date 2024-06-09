import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
    baseURL: `http://localhost:5002`,
});

export const validTtsModels: Set<string> = new Set([
    "None",
    "tts_models/en/multi-dataset/tortoise-v2",
    "tts_models/de/thorsten/tacotron2-DDC",
]);

export const apiClient = client;