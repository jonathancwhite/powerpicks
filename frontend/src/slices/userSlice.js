import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
	user: null,
};

export const registerUser = createAsyncThunk(
	"users/register",
	async (userData, thunkAPI) => {
		try {
			const result = await userService.registerUser(userData);
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

export const authUser = createAsyncThunk(
	"users/auth",
	async (loginData, thunkAPI) => {
		try {
			const result = await userService.authUser(loginData);
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

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(authUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(authUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload; // Update the user details here
			})
			.addCase(authUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
