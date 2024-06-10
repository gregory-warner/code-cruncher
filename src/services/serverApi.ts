import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const serverApi  = createApi({
    reducerPath: 'serverApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:${import.meta.env.VITE_SERVER_PORT}`,}),
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
        getActors: build.query({
            query: () => 'actors/getActiveActors',
        })
    })
});

export const { useGetUserQuery, useGetAssistantQuery, useGetActorsQuery, useFetchActiveAssistantsQuery } = serverApi;