import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  recent: [],
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts = [action.payload, ...state.contacts]
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    deleteContact: (state, action) => {
      const deletedContact = state.contacts.filter(
        (contact) => contact.id != action.payload
      );
      state.contacts = deletedContact;
    },
    addRecent: (state, action) => {
      let exist = state.recent.find(ex => ex.id === action.payload.id)
      if (exist) {
        exist = action.payload
      } else {
        state.recent.push(action.payload)
      }
    }
  },
});

export const {
  setContacts,
  addContact,
  deleteContact,
  addRecent
} = contactSlice.actions;

export default contactSlice.reducer;
