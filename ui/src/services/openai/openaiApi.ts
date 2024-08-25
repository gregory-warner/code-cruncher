import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {GetModelResponse, OpenAIRequest, OpenAiResponse} from "./types";

const baseUrl = 'https://api.openai.com/v1';

export const openaiApi  = createApi({
    reducerPath: 'openaiApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`);
        },
    }),
    endpoints: (build) => ({
        openaiModels: build.query<GetModelResponse, void>({
            query: () => ({
                url: 'models',
                method: 'GET',
            }),
        }),
        chat: build.mutation<OpenAiResponse, OpenAIRequest>({
            query: (params: OpenAIRequest) => ({
                url: 'chat/completions',
                method: 'POST',
                body: params,
            }),
        }),
    }),
});

export const { useChatMutation, useOpenaiModelsQuery } = openaiApi;