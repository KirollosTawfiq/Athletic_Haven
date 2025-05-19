import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "../features/exerciseSlice";
import detailReducer from "../features/detailSlice";
import scheduleReducer from "../features/scheduleSlice";

export const store = configureStore({
  reducer: {
    exercise: exerciseReducer,
    exerciseDetail: detailReducer,
    schedule: scheduleReducer,
  },
});
