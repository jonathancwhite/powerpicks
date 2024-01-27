import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import matchupService from "../services/matchupService";

const initialState = {
	matchups: [],
	year: null,
	week: null,
	league_id: null,
	isMatchupsLoading: false,
	isMatchupsError: false,
	matchupsMessage: "",
};

export const getMatchupsByWeek = createAsyncThunk(
	"matchups/getMatchupsByWeek",
	async ({ week, sport }, thunkAPI) => {
		try {
			const response = matchupService.getMatchupsByWeek(week, sport);
			return response;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const getMatchupsFromLeague = createAsyncThunk(
	"matchups/getMatchupsFromLeague",
	async (leagueId, thunkAPI) => {
		try {
			const response = matchupService.getMatchupsFromLeague(leagueId);
			return response;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const setMatchupsForSeason = createAsyncThunk(
	"matchups/setMatchupsForSeason",
	async ({ leagueId, matchupData, token }, thunkAPI) => {
		console.log(matchupData);
		try {
			const response = matchupService.setMatchupsForSeason(
				leagueId,
				matchupData,
				token,
			);
			return response;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

const matchupSlice = createSlice({
	name: "matchups",
	initialState: initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMatchupsByWeek.pending, (state) => {
				state.isMatchupsLoading = true;
			})
			.addCase(getMatchupsByWeek.fulfilled, (state, action) => {
				state.isMatchupsLoading = false;
				state.matchups = action.payload;
			})
			.addCase(getMatchupsByWeek.rejected, (state, action) => {
				state.isMatchupsLoading = false;
				state.isMatchupsError = true;
				state.matchupsMessage = action.payload;
			})
			.addCase(getMatchupsFromLeague.pending, (state) => {
				state.isMatchupsLoading = true;
			})
			.addCase(getMatchupsFromLeague.fulfilled, (state, action) => {
				state.isMatchupsLoading = false;
				state.matchups = action.payload;
			})
			.addCase(getMatchupsFromLeague.rejected, (state, action) => {
				state.isMatchupsLoading = false;
				state.isMatchupsError = true;
				state.matchupsMessage = action.payload;
			})
			.addCase(setMatchupsForSeason.pending, (state) => {
				state.isMatchupsLoading = true;
			})
			.addCase(setMatchupsForSeason.fulfilled, (state, action) => {
				state.isMatchupsLoading = false;
				state.matchups = action.payload;
			})
			.addCase(setMatchupsForSeason.rejected, (state, action) => {
				state.isMatchupsLoading = false;
				state.isMatchupsError = true;
				state.matchupsMessage = action.payload;
			});
	},
});

export default matchupSlice.reducer;
