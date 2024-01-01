import { createSlice } from "@reduxjs/toolkit";

const inspirationalQuoteArray = [
  {
    content: "Pending load...",
    author: "...",
  },
];
const interestingFactArray = [
  {
    content: "Pending load...",
    author: "...",
  },
];
const initialState = {
  inspirationalQuoteArray,
  interestingFactArray,
};

export const dashboardDataSlice = createSlice({
  name: "dashboardData",
  initialState,
  reducers: {
    resetData: (state) => {
      state = initialState;
    },
    setInspirationalQuote: (state, action) => {
      return { ...state, inspirationalQuoteArray: action.payload };
    },
    setInterestingFact: (state, action) => {
      return { ...state, interestingFactArray: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetData, setInspirationalQuote, setInterestingFact } =
  dashboardDataSlice.actions;

export default dashboardDataSlice.reducer;
