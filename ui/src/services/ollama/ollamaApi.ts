import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ollamaUrl} from "../../../config";
import {ModelResponse, Model, OllamaRequest, OllamaResponse} from "./types";

export const ollamaApi  = createApi({
    reducerPath: 'ollamaApi',
    baseQuery: fetchBaseQuery({ baseUrl: ollamaUrl,}),
    tagTypes: ['Model'],
    endpoints: (build) => ({
        unloadModel: build.query<ModelResponse, string>({
            query: (model: string) =>  ({
                url:  `api/generate`,
                method: 'POST',
                body: {
                    model,
                    keep_alive: 0
                },
            }),
        }),
        persistModel: build.query<ModelResponse, string>({
            query: (model: string) =>  ({
                url:  `api/generate`,
                method: 'POST',
                body: {
                    model,
                    keep_alive: -1
                },
            }),
        }),
        show: build.query<ModelResponse, string>({
            query: (model: string) =>  ({
                url:  `api/show`,
                method: 'POST',
                body: {
                    model,
                },
            }),
        }),
        heartbeat: build.query<string, string>({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
        }),
        runningModels: build.query<Model[], void>({
            query: () => ({
                url: 'api/ps',
                method: 'GET',
            }),
        }),
        models: build.query<ModelResponse, void>({
            query: () => ({
                url: 'api/tags',
                method: 'GET',
            }),
        }),
        chat: build.mutation<OllamaResponse, OllamaRequest>({
            query: (request: OllamaRequest) =>  ({
                url:  `api/chat`,
                method: 'POST',
                body: request,
            }),
        }),
    }),
});

export const {
    useLazyUnloadModelQuery,
    useLazyPersistModelQuery,
    useLazyShowQuery,
    useHeartbeatQuery,
    useLazyRunningModelsQuery,
    useModelsQuery,
    useChatMutation,
} = ollamaApi;