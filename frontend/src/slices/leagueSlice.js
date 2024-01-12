import { apiSlice } from "./apiSlice";

const LEAGUES_URL = "/api/leagues";

export const leagueSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		create: builder.mutation({
			query: (data) => ({
				url: `${LEAGUES_URL}/`,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useCreateMutation } = leagueSlice;
