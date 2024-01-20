import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: null,
	message: "",
};

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
			state.userInfo = null;
			localStorage.removeItem("userInfo");
			state.message = "User logged out successfully";
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
