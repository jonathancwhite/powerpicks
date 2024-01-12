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
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const createLeagueResponse = await queryFulfilled;
					dispatch(apiSlice.util.invalidateTags(["Leagues"]));
				} catch (err) {
					// Handle error
				}
			},
		}),
		getAllJoinableLeagues: builder.query({
			query: () => `${LEAGUES_URL}/`,
			providesTags: ["Leagues"],
		}),
		getUserLeagues: builder.query({
			query: (userId) => `${LEAGUES_URL}/user/${userId}`,
			providesTags: ["Leagues"],
		}),
	}),
});

export const {
	useCreateMutation,
	useGetAllJoinableLeaguesQuery,
	useGetUserLeaguesQuery,
} = leagueSlice;
