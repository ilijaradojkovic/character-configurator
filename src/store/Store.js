import { configureStore } from '@reduxjs/toolkit'
import { customizationSlice } from './CustomizationStore'

export const store = configureStore({
  reducer: {
    customization: customizationSlice.reducer,
  },
})