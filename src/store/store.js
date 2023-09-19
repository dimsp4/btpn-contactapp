import { configureStore } from '@reduxjs/toolkit'
import AppReducer from './AppReducer'
import ContactReducer from './ContactReducer'
import FormReducer from './FormReducer'

export const store = configureStore({
  reducer: {
    contact: ContactReducer,
    app: AppReducer,
    form: FormReducer
  },
})