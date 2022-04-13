import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import leagueService from './leagueService'

const initialState = {
  leagues: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new league
export const createLeague = createAsyncThunk(
  'leagues/create',
  async (leagueData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await leagueService.createLeague(leagueData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user leagues
export const getLeagues = createAsyncThunk(
  'leagues/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await leagueService.getLeagues(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user league
export const deleteLeague = createAsyncThunk(
  'leagues/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await leagueService.deleteLeague(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const leagueSlice = createSlice({
  name: 'league',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLeague.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createLeague.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.leagues.push(action.payload)
      })
      .addCase(createLeague.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getLeagues.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLeagues.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.leagues = action.payload
      })
      .addCase(getLeagues.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteLeague.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteLeague.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.leagues = state.leagues.filter(
          (league) => league._id !== action.payload.id
        )
      })
      .addCase(deleteLeague.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = leagueSlice.actions
export default leagueSlice.reducer