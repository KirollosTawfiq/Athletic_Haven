import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "../features/exerciseSlice";
import detailReducer from "../features/detailSlice";

export const store = configureStore({
  reducer: {
    exercise: exerciseReducer,
    exerciseDetail: detailReducer,
  },
});
