import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
    tagTypes: ['Lists'],
    endpoints: (builder) => ({
        getBoardDetails: builder.query({
            query: (id) => `/boards/${id}?key=${APIKey}&token=${APIToken}`,
            providesTags: ['Lists'],
        }),
        getLists: builder.query({
            query: (id) => `/boards/${id}/lists?filter=open&key=${APIKey}&token=${APIToken}`,
            providesTags: ['Lists'],
        }),
        createList: builder.mutation({
            query: ({ name, idBoard }) => ({
                url: `/lists?key=${APIKey}&token=${APIToken}`,
                method: 'POST',
                params: { name: encodeURIComponent(name), idBoard },
            }),
            invalidatesTags: ['Lists'],
        }),
        deleteList: builder.mutation({
            query: (listId) => ({
                url: `/lists/${listId}/closed?value=true&key=${APIKey}&token=${APIToken}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Lists'],
        }),
        createCard: builder.mutation({
            query: ({ name, idList }) => ({
                url: `/cards?key=${APIKey}&token=${APIToken}`,
                method: 'POST',
                params: { name: encodeURIComponent(name), idList },
            }),
        }),
        getCheckLists: builder.query({
            query: (cardId) => `/cards/${cardId}/checklists?key=${APIKey}&token=${APIToken}`,
        }),
        createCheckList: builder.mutation({
            query: ({ cardId, name }) => ({
                url: `/cards/${cardId}/checklists?key=${APIKey}&token=${APIToken}`,
                method: 'POST',
                body: { name },
            }),
        }),
        deleteCheckList: builder.mutation({
            query: (checkListId) => ({
                url: `/checklists/${checkListId}?key=${APIKey}&token=${APIToken}`,
                method: 'DELETE',
            }),
        }),
        getCheckItems: builder.query({
            query: (checkListId) => `/checklists/${checkListId}/checkItems?key=${APIKey}&token=${APIToken}`,
        }),
        createCheckItem: builder.mutation({
            query: ({ checkListId, name }) => ({
                url: `/checklists/${checkListId}/checkItems?key=${APIKey}&token=${APIToken}`,
                method: 'POST',
                body: { name },
            }),
        }),
        deleteCheckItem: builder.mutation({
            query: ({ checkListId, checkItemId }) => ({
                url: `/checklists/${checkListId}/checkItems/${checkItemId}?key=${APIKey}&token=${APIToken}`,
                method: 'DELETE',
            }),
        }),
        updateCheckItemStatus: builder.mutation({
            query: ({ cardId, checkItemId, state }) => ({
                url: `/cards/${cardId}/checkItem/${checkItemId}?state=${state}&key=${APIKey}&token=${APIToken}`,
                method: 'PUT',
            }),
        }),
        getCards: builder.query({
            query: (listId) => `/lists/${listId}/cards?key=${APIKey}&token=${APIToken}`,
        }),
        deleteCard: builder.mutation({
            query: (cardId) => ({
                url: `/cards/${cardId}?key=${APIKey}&token=${APIToken}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetCheckListsQuery,
    useCreateCheckListMutation,
    useDeleteCheckListMutation,
    useGetBoardDetailsQuery,
    useGetListsQuery,
    useCreateListMutation,
    useDeleteListMutation,
    useCreateCardMutation,
    useGetCheckItemsQuery,
    useCreateCheckItemMutation,
    useDeleteCheckItemMutation,
    useUpdateCheckItemStatusMutation,
    useGetCardsQuery,
    useDeleteCardMutation,
} = apiSlice;
