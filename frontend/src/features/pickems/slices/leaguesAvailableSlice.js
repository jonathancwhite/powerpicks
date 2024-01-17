import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leaguesAvailableService from "./leaguesAvailableService";
import Cookies from "js-cookie";

const initialState = {
	filter: "ALL",
	leaguesAvailable: [],
	isSuccess: false,
	isError: false,
	isLoading: false,
	message: "",
};

export const getAllJoinableLeagues = createAsyncThunk(
	"leaguesAvailable/getAllJoinableLeagues",
	async (_, thunkAPI) => {
		try {
			const token = Cookies.get("jwt");
			const result = await leaguesAvailableService.getAllJoinableLeagues(
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
				`leaguesAvailableSlice.js - getAllJoinableLeagues() - ${message}`,
			);
			return thunkAPI.rejectWithValue(message);
		}
	},
);

const leaguesAvailableSlice = createSlice({
	name: "leaguesAvailable",
	initialState: initialState,
	reducers: {
		setLeaguesAvailable: (state, action) => {
			state.leaguesAvailable = action.payload;
		},
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
				state.leaguesAvailable = action.payload;
			})
			.addCase(getAllJoinableLeagues.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { setLeaguesAvailable, setFilter, clearLeagueFilter, reset } =
	leaguesAvailableSlice.actions;

export default leaguesAvailableSlice.reducer;
