import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {chatServerUrl} from "../../../config";
import {
    AddMessageRequest,
    SessionNameRequest,
    SessionParticipantRequest,
    SessionRequest, UpdateActorRequest,
    UpdateAIModelRequest,
    UpdatePromptRequest, UpdateSessionTypeIdRequest,
} from "./types";
import {Actor, Message, Session, SessionParticipant, SessionParticipantType, User} from "../../types";

export const serverApi  = createApi({
    reducerPath: 'serverApi',
    baseQuery: fetchBaseQuery({ baseUrl: chatServerUrl,}),
    tagTypes: ['Messages', 'Actors', 'Sessions', 'Session', 'SessionParticipants'],
    endpoints: (build) => ({
        getUser: build.query<User, number>({
            query: (id: number) => `users/${id}`,
        }),
        getUserByUsername: build.query<User, string>({
            query: (username: string) => `users/user/${username}`
        }),
        getActor: build.query({
            query: (username: string) => `actors/actor/${username}`,
        }),
        getActors: build.query<Actor[], void>({
            query: () => 'actors/',
            providesTags: [{ type: 'Actors', id: 'LIST' }],
        }),
        addMessage: build.mutation<Message, AddMessageRequest>({
            query: (message: AddMessageRequest) => ({
                url: 'messages/create',
                method: 'POST',
                body: { message },
            }),
            invalidatesTags: (result, error, { sessionId }) => [
                { type: 'Messages', id: sessionId },
            ],
        }),
        deleteMessage: build.mutation<Message, number>({
            query: (id: number) => ({
                url: `messages/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [
                { type: 'Messages' }
            ]
        }),
        updateMessage: build.mutation<Message, Message>({
            query: (message: Message) => ({
                url: `messages/${message.messageId}`,
                method: 'PATCH',
                body: message,
            }),
            invalidatesTags: (result, error, { sessionId }) => [
                { type: 'Messages', id: sessionId },
            ],
        }),
        getMessages: build.query<Message[], number>({
            query: (sessionId: number) => ({
                url: `messages/${sessionId}`,
            }),
            providesTags: (result, error, sessionId) =>
                result ? [{ type: 'Messages', id: sessionId }] : [],
        }),
        updatePrompt: build.mutation<void, UpdatePromptRequest>({
            query: (actorPrompt: UpdatePromptRequest) => ({
                url: `prompts/update`,
                method: 'PATCH',
                body: actorPrompt,
            }),
            invalidatesTags: () => [
                { type: 'Actors' }
            ]
        }),
        createActor: build.mutation<{actor: Actor}, FormData>({
            query: (formData: FormData) => ({
                url: `actors/create`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [{ type: 'Actors' }],
        }),
        updateActor: build.mutation<Actor, UpdateActorRequest>({
            query: (updateRequest: UpdateActorRequest) => {
                return ({
                    url: `actors/update/${updateRequest.actorId}`,
                    method: 'PATCH',
                    body: updateRequest,
                });
            },
            invalidatesTags: [{ type: 'Actors' }],
        }),
        deleteSession: build.mutation<Session, number>({
            query: (sessionId: number) => ({
                url: `sessions/${sessionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, sessionId) => [
                { type: 'Messages', id: sessionId },
                { type: 'Sessions' },
            ],
        }),
        getSessions: build.query<Session[], void>({
            query: () => ({
                url: `sessions/`,
                method: 'GET',
            }),
            providesTags: [{ type: 'Sessions', id: 'LIST' }],
        }),
        createSession: build.mutation<Session, SessionRequest>({
            query: (request: SessionRequest) => ({
                url: `sessions/create`,
                method: 'POST',
                body: request,
            }),
            invalidatesTags: () => [
                { type: 'Sessions' },
            ],
        }),
        updateSessionName: build.mutation<Session, SessionNameRequest>({
            query: (request: SessionNameRequest) => ({
                url: `sessions/${request.sessionId}/name`,
                method: 'PATCH',
                body: { sessionName: request.sessionName },
            }),
            invalidatesTags: () => [
                { type: 'Sessions' },
            ],
        }),
        addParticipant: build.mutation<SessionParticipant, SessionParticipantRequest>({
            query: (request: SessionParticipantRequest) => ({
                url: `sessions/add-participant`,
                method: 'POST',
                body: request,
            }),
            invalidatesTags: () => [
                { type: 'Sessions' },
            ],
        }),
        getSessionParticipants: build.query<SessionParticipantType[], number>({
            query: (sessionId: number) => ({
                url: `sessions/${sessionId}/participants`,
                method: 'GET',
            }),
            providesTags: ['SessionParticipants'],
        }),
        getSession: build.query<Session, number>({
            query: (sessionId: number) => ({
                url: `sessions/${sessionId}`,
                method: 'GET',
            }),
            providesTags: (result, error, sessionId) =>
                result ? [{ type: 'Session', id: sessionId }] : [],
        }),
        updateAIModel: build.mutation<void, UpdateAIModelRequest>({
            query: (modelRequest: UpdateAIModelRequest) => ({
                url: `models/update`,
                method: 'PATCH',
                body: modelRequest,
            }),
            invalidatesTags: () => [
                { type: 'Actors' }
            ],
        }),
        updateSessionTypeId: build.mutation<Session, UpdateSessionTypeIdRequest>({
            query: (request: UpdateSessionTypeIdRequest) => ({
                url: `sessions/${request.sessionId}/type-id`,
                method: 'PATCH',
                body: request,
            }),
            invalidatesTags: () => [
                { type: 'Session' }
            ],
        }),
    }),
});

export const {
    useLazyGetMessagesQuery,
    useUpdateMessageMutation,
    useCreateActorMutation,
    useDeleteMessageMutation,
    useGetUserQuery,
    useGetActorsQuery,
    useDeleteSessionMutation,
    useUpdateSessionNameMutation,
    useCreateSessionMutation,
    useGetSessionsQuery,
    useAddParticipantMutation,
    useLazyGetSessionParticipantsQuery,
    useAddMessageMutation,
    useGetMessagesQuery,
    useGetSessionQuery,
    useUpdatePromptMutation,
    useUpdateAIModelMutation,
    useUpdateActorMutation,
    useGetSessionParticipantsQuery,
    useUpdateSessionTypeIdMutation,
} = serverApi;