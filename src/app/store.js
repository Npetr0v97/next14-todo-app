import { configureStore } from "@reduxjs/toolkit";
import dummyDataReducer from "../../features/dummyData/dummyDataSlice";
import dashboardDataReducer from "../../features/dashboardData/dashboardData";

export const store = configureStore({
  reducer: {
    dummyData: dummyDataReducer,
    dashboardData: dashboardDataReducer,
  },
});
