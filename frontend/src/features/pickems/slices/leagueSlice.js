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

export const getLeagueByIdWithDetails = createAsyncThunk(
	"league/getLeagueByIdWithDetails",
	async ({ id, token }, thunkAPI) => {
		try {
			const result = await leagueService.getLeagueByIdWithDetails(
				id,
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

export const removeMemberById = createAsyncThunk(
	"league/removeMemberById",
	async ({ memberId, leagueId }, thunkAPI) => {
		try {
			const token = Cookies.get("jwt");
			const result = await leagueService.removeMemberById(
				memberId,
				leagueId,
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

export const getInviteLinkUrlByLeagueId = createAsyncThunk(
	"league/getInviteLinkUrlByLeagueId",
	async (leagueId, thunkAPI) => {
		try {
			const token = Cookies.get("jwt");
			const result = await leagueService.getInviteLinkUrlByLeagueId(
				leagueId,
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

export const getLeagueByCode = createAsyncThunk(
	"league/getLeagueByCode",
	async (code, thunkAPI) => {
		try {
			const result = await leagueService.getLeagueByCode(code);
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

export const deleteLeague = createAsyncThunk(
	"league/deleteLeague",
	async ({ id, token }, thunkAPI) => {
		try {
			const result = await leagueService.deleteLeague(id, token);
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
			})
			.addCase(getLeagueByIdWithDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getLeagueByIdWithDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.league = action.payload; // only want the one league
			})
			.addCase(getLeagueByIdWithDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(removeMemberById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeMemberById.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(removeMemberById.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getInviteLinkUrlByLeagueId.fulfilled, (state) => {
				state.isSuccess = true;
			})
			.addCase(getInviteLinkUrlByLeagueId.rejected, (state, action) => {
				// state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getLeagueByCode.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getLeagueByCode.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.league = action.payload;
			})
			.addCase(getLeagueByCode.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteLeague.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteLeague.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.league = action.payload;
			})
			.addCase(deleteLeague.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { setFilter, clearLeagueFilter, reset } = leagueSlice.actions;

export default leagueSlice.reducer;
