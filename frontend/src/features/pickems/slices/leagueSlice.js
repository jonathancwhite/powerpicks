import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leagueService from "./leagueService";
import Cookies from "js-cookie";

const initialState = {
	league: [],
	isSuccess: false,
	isError: false,
	isLoading: false,
	message: "",
};

export const updateLeague = createAsyncThunk(
	"league/updateLeague",
	async (leagueId, leagueData, thunkAPI) => {
		try {
			const token = Cookies.get("jwt");
			const result = await leagueService.updateLeague(
				leagueId,
				leagueData,
				token,
			);
			return result;
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

export const getLeagueById = createAsyncThunk(
	"league/getLeagueById",
	async ({ id, token }, thunkAPI) => {
		try {
			const result = await leagueService.getLeagueById(id, token);
			return result;
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

const leagueSlice = createSlice({
	name: "league",
	initialState: initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateLeague.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateLeague.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(updateLeague.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getLeagueById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getLeagueById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.league = action.payload; // only want the one league
			})
			.addCase(getLeagueById.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { setFilter, clearLeagueFilter, reset } = leagueSlice.actions;

export default leagueSlice.reducer;
