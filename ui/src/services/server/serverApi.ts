import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {chatServerUrl} from "../../../config";
import {
    ActorPrompt,
    DialogsResponse,
    ServerResponse,
    DialogsRequest,
    CreateDialogResponse,
    UpdateDialogNameRequest
} from "./types";
import {Dialog} from "../../types";

export const serverApi  = createApi({
    reducerPath: 'serverApi',
    baseQuery: fetchBaseQuery({ baseUrl: chatServerUrl,}),
    tagTypes: ['Messages', 'Actors', 'Dialogs'],
    endpoints: (build) => ({
        getUser: build.query<User, string>({
            query: (username: string) => `users/get-user/${username}`
        }),
        getActor: build.query({
            query: (username: string) => `actors/getActor/${username}`,
        }),
        getActors: build.query<Actor[], void>({
            query: () => 'actors/',
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
                { type: 'Dialogs' },
            ],
        }),
        getDialogs: build.query<DialogsResponse, DialogsRequest>({
            query: (request: DialogsRequest) => ({
                url: `dialogs/dialogs`,
                method: 'GET',
                params: request,
            }),
            providesTags: [{ type: 'Dialogs', id: 'LIST' }],
        }),
        createDialog: build.mutation<CreateDialogResponse, DialogsRequest>({
            query: (request: DialogsRequest) => ({
                url: `dialogs/createDialog`,
                method: 'POST',
                body: request,
            }),
            invalidatesTags: () => [
                { type: 'Dialogs' },
            ],
        }),
        updateDialogName: build.mutation<Dialog, UpdateDialogNameRequest>({
            query: (request: UpdateDialogNameRequest) => ({
                url: `dialogs/updateDialogName`,
                method: 'PATCH',
                body: request,
            }),
            invalidatesTags: () => [
                { type: 'Dialogs' },
            ],
        }),
    }),
});

export const { useUpdateDialogNameMutation, useCreateDialogMutation, useGetDialogsQuery, useUpdateActorMutation, useDeleteDialogMutation, useAddMessageMutation, useLazyGetMessagesQuery, useUpdateMessageMutation, useCreateActorMutation, useUpdatePromptMutation, useDeleteMessageMutation, useGetUserQuery, useGetActorQuery: useGetActorQuery, useGetActorsQuery } = serverApi;