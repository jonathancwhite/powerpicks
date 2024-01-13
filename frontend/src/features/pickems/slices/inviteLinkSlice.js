import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import inviteLinkService from "./inviteLinkService";

// Async thunk to fetch invite links for specific league
export const fetchInviteLinksAsync = createAsyncThunk(
	"inviteLinks/fetchInviteLinks",
	async () => {
		const response = await fetchInviteLinks();
		return response.data;
	},
);

// Async thunk to generate invite link
export const generateInviteLinkAsync = createAsyncThunk(
	"inviteLinks/generateInviteLink",
	async (payload) => {
		const response = await generateInviteLink(payload);
		return response.data;
	},
);

// Invite link slice
const inviteLinkSlice = createSlice({
	name: "inviteLinks",
	initialState: {
		inviteLinks: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInviteLinksAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchInviteLinksAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.inviteLinks = action.payload;
			})
			.addCase(fetchInviteLinksAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(generateInviteLinkAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(generateInviteLinkAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.inviteLinks.push(action.payload);
			})
			.addCase(generateInviteLinkAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default inviteLinkSlice.reducer;
