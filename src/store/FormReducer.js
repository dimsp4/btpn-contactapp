import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  age: "",
  photo: "",
};

export const formSlicer = createSlice({
  initialState,
  name: "form",
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setContactForm: (state, action) => {
        state = action.payload
    }
  },
});

export const { setId, setFirstName, setAge, setLastName, setPhoto, setContactForm } =
  formSlicer.actions;

export default formSlicer.reducer;
