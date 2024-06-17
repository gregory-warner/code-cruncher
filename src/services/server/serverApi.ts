import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {chatServerUrl} from "../../../config";
import {ActorPrompt, CreateActorResponse} from "./types";

export const serverApi  = createApi({
    reducerPath: 'serverApi',
    baseQuery: fetchBaseQuery({ baseUrl: chatServerUrl,}),
    endpoints: (build) => ({
        getUser: build.query({
            query: (username: string) => `users/getUser/${username}`
        }),
        getAssistant: build.query({
            query: (username: string) => `actors/getAssistant/${username}`,
        }),
        fetchActiveAssistants: build.query({
            query: () => ({
                url: 'actors/getActiveAssistants',
                method: 'GET',
            })
        }),
        getActors: build.query<Actor[], void>({
            query: () => 'actors/getActiveActors',
        }),
        deleteMessage: build.mutation<void, number>({
            query: (messageId: number) => ({
                url: 'messages/deleteMessage',
                method: 'PATCH',
                body: { messageId }
            }),
        }),
        updatePrompt: build.mutation<void, ActorPrompt>({
            query: (actorPrompt: ActorPrompt) => ({
                url: `prompts/updatePrompt`,
                method: 'POST',
                body: actorPrompt,
            }),
        }),
        createActor: build.mutation<CreateActorResponse, FormData>({
            query: (formData: FormData) => ({
                url: `actors/create`,
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useCreateActorMutation, useUpdatePromptMutation, useDeleteMessageMutation, useGetUserQuery, useGetAssistantQuery, useGetActorsQuery, useFetchActiveAssistantsQuery } = serverApi;