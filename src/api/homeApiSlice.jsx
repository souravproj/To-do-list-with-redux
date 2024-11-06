import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const HomeapiSlice = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
    tagTypes: ['Boards'],

    endpoints: (builder) => ({
        getBoards: builder.query({
            query: () => `/members/me/boards?key=${APIKey}&token=${APIToken}`,
            // Provide the 'Boards' tag to enable automatic refetching
            providesTags: ['Boards'],
        }),
        createBoard: builder.mutation({
            query: ({ name, bgColor }) => ({
                url: `/boards/?key=${APIKey}&token=${APIToken}`,
                method: 'POST',
                params: {
                    name: encodeURIComponent(name),
                    prefs_background: bgColor,
                },
            }),
            // Invalidate 'Boards' to trigger refetch of getBoards
            invalidatesTags: ['Boards'],
        }),
    }),
});

export const { useGetBoardsQuery, useCreateBoardMutation } = HomeapiSlice;
