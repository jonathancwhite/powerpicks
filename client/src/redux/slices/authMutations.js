import { apiSlice } from "./apiSlice.js";

const USERS_URL = "/api/users";

export const authMutations = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/`,
				method: "POST",
				body: data,
			}),
		}),
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/auth`,
				method: "POST",
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: "POST",
			}),
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
	authMutations;
