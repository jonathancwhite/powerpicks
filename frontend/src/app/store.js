import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import leagueReducer from '../features/leagues/leagueSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leagues: leagueReducer,
  },
})