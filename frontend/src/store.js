import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import userReducer from "./slices/userSlice.js";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		user: userReducer,
	},
});
