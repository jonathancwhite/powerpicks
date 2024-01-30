import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ncaafService from "./ncaafService";

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

export const getMatchupsByWeek = createAsyncThunk(
	"ncaaf/getMatchupsByWeek",
	async ({ week }, thunkAPI) => {
		try {
			const response = ncaafService.getMatchupsByWeek(week);
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

const ncaafSlice = createSlice({
	name: "ncaaf",
	initialState: initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMatchupsByWeek.pending, (state) => {
				state.isCFBLoading = true;
			})
			.addCase(getMatchupsByWeek.fulfilled, (state, action) => {
				state.isCFBLoading = false;
				state.games = action.payload;
			})
			.addCase(getMatchupsByWeek.rejected, (state, action) => {
				state.isCFBLoading = false;
				state.isCFBError = true;
				state.CFBMessage = action.payload;
			});
	},
});

export const { reset } = ncaafSlice.actions;

export default ncaafSlice.reducer;
