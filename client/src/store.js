import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./redux/slices/apiSlice.js";
import authReducer from "./redux/slices/authSlice.js";
import leagueReducer from "./redux/slices/leagueSlice.js";
import leaguesJoinedReducer from "./redux/slices/leaguesJoinedSlice.js";
import leaguesAvailableReducer from "./redux/slices/leaguesAvailableSlice.js";
import profileReducer from "./redux/slices/profileSlice.js";
import matchupReducer from "./redux/slices/matchupSlice.js";

/**
 * Removed inviteLinks for now since they are populated inside of currentLeague
 */
export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer, // currentUser
		league: leagueReducer, // handles currentLeague
		leaguesJoined: leaguesJoinedReducer,
		leaguesAvailable: leaguesAvailableReducer,
		// inviteLinks: inviteLinkReducer,
		profile: profileReducer, // handles profiles of other users
		matchups: matchupReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});
