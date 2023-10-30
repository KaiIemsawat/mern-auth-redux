import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

// ! dependency injection
// Create endpoint in this file. Then inject to 'endpoints' in apiSlice.js
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`, // match this to 'controllers/userControler.js' in backend
                method: "POST",
                body: data,
            }),
        }),
    }),
});

// ! specific way to export
// 'use' + 'mutation name', in this case, 'login' + 'mutation'
// = 'useLoginMutation'
// IF it's 'query' instead of 'mutation', replace 'mutation' with 'query'
export const { useLoginMutation } = usersApiSlice;
