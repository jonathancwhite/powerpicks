import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
	userInfo: localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: null,
	message: "",
};

/**
 * @desc   	Updates user profile
 * @param  	{string} token - jwt token
 * @param  	{object} user - User Data
 * @returns	{object} response - User Object
 */
export const updateUser = createAsyncThunk(
	"user/updateUser",
	async ({ id, token, updatedUserInfo }, thunkAPI) => {
		try {
			const result = await authService.updateUser(
				id,
				token,
				updatedUserInfo,
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

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
			state.message = "User logged in successfully";
		},
		logout: (state, action) => {
			localStorage.removeItem("userInfo");
			state.message = "User logged out successfully";
			state.userInfo = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.userInfo = action.payload;
				state.message = "User updated successfully";
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
