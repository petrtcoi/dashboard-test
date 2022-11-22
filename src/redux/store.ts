import { configureStore } from '@reduxjs/toolkit'
import worksReducer from './slices/works'
export const store = configureStore({
  reducer: {
    works: worksReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch