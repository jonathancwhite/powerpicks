import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leaguesJoinedService from "./leaguesJoinedService";
import Cookies from "js-cookie";

const initialState = {
	leaguesJoined: [],
	isSuccess: false,
	isError: false,
	isLoading: false,
	message: "",
};

export const createAndJoinLeague = createAsyncThunk(
	"leaguesJoined/createAndJoinLeague",
	async ({ token, leagueData }, thunkAPI) => {
		try {
			const result = await leaguesJoinedService.createLeague(
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

export const getAllJoinedLeagues = createAsyncThunk(
	"leaguesJoined/getAllJoinedLeagues",
	async (userId, thunkAPI) => {
		try {
			const token = Cookies.get("jwt");
			const result = await leaguesJoinedService.getAllJoinedLeagues(
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
			console.log(
				`leaguesJoinedSlice.js - getAllJoinedLeagues() - ${message}`,
			);
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const joinLeagueByCode = createAsyncThunk(
	"leagues/joinLeagueByCode",
	async (code, thunkAPI) => {
		try {
			const token = Cookies.get("jwt");
			const result = await leaguesJoinedService.joinLeagueByCode(
				code,
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

const leaguesJoinedSlice = createSlice({
	name: "leaguesJoined",
	initialState: initialState,
	reducers: {
		setLeaguesJoined: (state, action) => {
			state.leaguesJoined = action.payload;
		},
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllJoinedLeagues.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllJoinedLeagues.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.leaguesJoined = action.payload;
			})
			.addCase(getAllJoinedLeagues.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createAndJoinLeague.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createAndJoinLeague.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.leaguesJoined = action.payload;
			})
			.addCase(createAndJoinLeague.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(joinLeagueByCode.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(joinLeagueByCode.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.leaguesJoined = action.payload;
			})
			.addCase(joinLeagueByCode.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { setLeaguesJoined, reset } = leaguesJoinedSlice.actions;

export default leaguesJoinedSlice.reducer;
