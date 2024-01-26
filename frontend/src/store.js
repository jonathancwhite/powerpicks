import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import authReducer from "./slices/authSlice.js";
import leagueReducer from "./features/pickems/slices/leagueSlice.js";
import leaguesJoinedReducer from "./features/pickems/slices/leaguesJoinedSlice.js";
import leaguesAvailableReducer from "./features/pickems/slices/leaguesAvailableSlice.js";
// import inviteLinkReducer from "./features/pickems/slices/inviteLinkSlice.js";
import profileReducer from "./features/pickems/slices/profileSlice.js";
import ncaafReducer from "./features/pickems/slices/ncaafSlice.js";

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
		ncaaf: ncaafReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});
