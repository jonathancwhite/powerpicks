import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cfbService from "./cfbService";

const initialState = {
	games: [],
	conferences: [],
	teams: [],
	year: null,
	division: null,
	isCFBLoading: false,
	isCFBError: false,
	CFBMessage: "",
};

export const fetchCFBGames = createAsyncThunk(
	"cfb/fetchCFBGames",
	async ({ year, week }, thunkAPI) => {
		try {
			const response = cfbService.fetchCFBGames(year, week);
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

const cfbSlice = createSlice({
	name: "cfb",
	initialState: initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCFBGames.pending, (state) => {
				state.isCFBLoading = true;
			})
			.addCase(fetchCFBGames.fulfilled, (state, action) => {
				state.isCFBLoading = false;
				state.games = action.payload;
			})
			.addCase(fetchCFBGames.rejected, (state, action) => {
				state.isCFBLoading = false;
				state.isCFBError = true;
				state.CFBMessage = action.payload;
			});
	},
});

export const { reset } = cfbSlice.actions;

export default cfbSlice.reducer;
