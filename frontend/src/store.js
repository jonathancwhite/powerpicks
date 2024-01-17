import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import authReducer from "./slices/authSlice.js";
import leagueReducer from "./features/pickems/slices/leagueSlice.js";
import leaguesJoinedReducer from "./features/pickems/slices/leaguesJoinedSlice.js";
import leaguesAvailableReducer from "./features/pickems/slices/leaguesAvailableSlice.js";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
		league: leagueReducer, // handles currentLeague
		leaguesJoined: leaguesJoinedReducer,
		leaguesAvailable: leaguesAvailableReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});
