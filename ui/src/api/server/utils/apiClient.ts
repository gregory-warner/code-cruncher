import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
    baseURL: `http://localhost:${import.meta.env.VITE_SERVER_PORT}`,
});

export const apiClient = client;