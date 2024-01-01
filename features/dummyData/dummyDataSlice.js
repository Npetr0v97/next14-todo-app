import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "Hello World",
};

export const dummyDataSlice = createSlice({
  name: "dummyData",
  initialState,
  reducers: {
    resetDummyData: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = "Hello World";
    },
    setDummyData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetDummyData, setDummyData } = dummyDataSlice.actions;

export default dummyDataSlice.reducer;
