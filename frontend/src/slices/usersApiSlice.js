import { USERS_URl } from "../constants"; 
import { apiSlice } from "./apiSlice"; 

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URl}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URl}`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URl}/logout`,
                method: 'POST',
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URl}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation } = usersApiSlice;