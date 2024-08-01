import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {chatServerUrl} from "../../../config";
import {ActorPrompt, ServerResponse} from "./types";

export const serverApi  = createApi({
    reducerPath: 'serverApi',
    baseQuery: fetchBaseQuery({ baseUrl: chatServerUrl,}),
    tagTypes: ['Messages', 'Actors'],
    endpoints: (build) => ({
        getUser: build.query<User, string>({
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
            providesTags: [{ type: 'Actors', id: 'LIST' }],
        }),
        addMessage: build.mutation<Message, Message>({
            query: (message: Message) => ({
                url: 'messages/addMessage',
                method: 'POST',
                body: { message },
            }),
            invalidatesTags: (result, error, { dialogId }) => [
                { type: 'Messages', id: dialogId },
            ],
        }),
        deleteMessage: build.mutation<Message, number>({
            query: (messageId: number) => ({
                url: 'messages/deleteMessage',
                method: 'PATCH',
                body: { messageId }
            }),
            invalidatesTags: () => [
                { type: 'Messages' }
            ]
        }),
        updateMessage: build.mutation<{msg: string}, Message>({
            query: (message: Message) => ({
                url: 'messages/updateMessage',
                method: 'PATCH',
                body: { message },
            }),
            invalidatesTags: (result, error, { dialogId }) => [
                { type: 'Messages', id: dialogId },
            ],
        }),
        getMessages: build.query<Message[], number>({
            query: (dialogId: number) => ({
                url: `messages/getMessages/${dialogId}`,
            }),
            providesTags: (result, error, dialogId) =>
                result ? [{ type: 'Messages', id: dialogId }] : [],
        }),
        updatePrompt: build.mutation<void, ActorPrompt>({
            query: (actorPrompt: ActorPrompt) => ({
                url: `prompts/updatePrompt`,
                method: 'POST',
                body: actorPrompt,
            }),
        }),
        createActor: build.mutation<ServerResponse, FormData>({
            query: (formData: FormData) => ({
                url: `actors/create`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [{ type: 'Actors' }],
        }),
        updateActor: build.mutation<ServerResponse, FormData>({
            query: (formData: FormData) => {
                return ({
                    url: `actors/update`,
                    method: 'POST',
                    body: formData,
                });
            },
            invalidatesTags: [{ type: 'Actors' }],
        }),
        deleteDialog: build.mutation<ServerResponse, number>({
            query: (dialogId: number) => ({
                url: `dialogs/deleteDialog/${dialogId}`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, dialogId) => [
                { type: 'Messages', id: dialogId },
            ],
        }),
    }),
});

export const { useUpdateActorMutation, useDeleteDialogMutation, useAddMessageMutation, useLazyGetMessagesQuery, useUpdateMessageMutation, useCreateActorMutation, useUpdatePromptMutation, useDeleteMessageMutation, useGetUserQuery, useGetAssistantQuery, useGetActorsQuery, useFetchActiveAssistantsQuery } = serverApi;