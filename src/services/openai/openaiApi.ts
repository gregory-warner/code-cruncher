import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {GetModelResponse, PostChatParams} from "./types";

const baseUrl = 'https://api.openai.com/v1';

export const openaiApi  = createApi({
    reducerPath: 'openaiApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState: RootState }) => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`);
        },
    }),
    endpoints: (build) => ({
        getModels: build.query<GetModelResponse, void>({
            query: () => 'models',
        }),
        postChat: build.mutation<any, PostChatParams>({
            query: (params: PostChatParams) => ({
                url: 'chat/completions',
                method: 'POST',
                body: params,
            }),
        }),
    }),
});

export const { usePostChatMutation, useGetModelsQuery } = openaiApi;