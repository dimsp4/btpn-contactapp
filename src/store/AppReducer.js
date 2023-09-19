import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMassage: '',
  isError: false
};

export const appSlicer = createSlice({
  initialState,
  name: "app",
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action) => {
        state.errorMassage = action.payload
    },
    popError:(state, action) => {
        state.isError = action.payload
    }
  },
});

export const { setLoading, setErrorMessage, popError} = appSlicer.actions

export default appSlicer.reducer
