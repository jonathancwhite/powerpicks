import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leagueService from "./leagueService";
import Cookies from "js-cookie";

const initialState = {
	filter: "ALL",
	leagues: [],
	isSuccess: false,
	isError: false,
	isLoading: false,
	message: "",
};

export const getAllJoinableLeagues = createAsyncThunk(
	"leagues/",
	async (_, thunkAPI) => {
		try {
			const token = Cookies.get("jwt");
			const result = await leagueService.getAllJoinableLeagues(token);
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

export const getUserLeagues = createAsyncThunk(
	"leagues/getUserLeagues",
	async (userId, thunkAPI) => {
		try {
			const token = Cookies.get("jwt");
			const result = await leagueService.getAllJoinableLeagues(
				userId,
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

export const createLeague = createAsyncThunk(
	"leagues/create",
	async (leagueData, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.userInfo.token;
			const token = Cookies.get("jwt");
			const result = await leagueService.createLeague(leagueData, token);
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

const leagueSlice = createSlice({
	name: "league",
	initialState: initialState,
	reducers: {
		setFilter: (state, action) => {
			state.filter = action.payload;
		},
		clearLeagueFilter: (state) => {
			state.filter = "ALL";
		},
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllJoinableLeagues.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllJoinableLeagues.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.leagues = action.payload;
			})
			.addCase(getAllJoinableLeagues.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getUserLeagues.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserLeagues.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.leagues = action.payload;
			})
			.addCase(getUserLeagues.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
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
			.addCase(createLeague.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createLeague.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.leagues.push(action.payload);
			})
			.addCase(createLeague.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { setFilter, clearLeagueFilter, reset } = leagueSlice.actions;

export default leagueSlice.reducer;
