import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const openaiApi  = createApi({
    reducerPath: 'openaiApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.openai.com/v1',
        prepareHeaders: (headers, { getState: RootState }) => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`);
        },
    }),
    endpoints: (build) => ({
        getModels: build.query<GetModelResponse, void>({
            query: () => 'models',
        })
    }),
});

export const { useGetModelsQuery } = openaiApi;