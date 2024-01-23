import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

const initialState = {
	user: null,
	isSuccess: false,
	isError: false,
	isLoading: false,
	message: "",
};

/**
 * @desc   	Gets user profile
 * @param  	{string} token - jwt token
 * @returns	{object} response - User Object
 */
export const fetchUserProfile = createAsyncThunk(
	"profile/fetchUserProfile",
	async ({ id, token }, thunkAPI) => {
		// this is being hit 3 times every time it's called, why?
		try {
			const result = await profileService.fetchUserProfile(id, token);
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

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = profileSlice.actions;

export default profileSlice.reducer;
