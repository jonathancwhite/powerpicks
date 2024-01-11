import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	filter: "ALL",
};

const leagueSlice = createSlice({
	name: "league",
	initialState,
	reducers: {
		setFilter: (state, action) => {
			state.filter = action.payload;
		},
		clearLeagueFilter: (state) => {
			state.filter = "ALL";
		},
	},
});

export const { setFilter, clearLeagueFilter } = leagueSlice.actions;

export default leagueSlice.reducer;
