import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    selectedDate: dayjs(),
    bodyPart: "",
    exercises: [],
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setBodyPart: (state, action) => {
      state.bodyPart = action.payload;
    },
    setExercises: (state, action) => {
      state.exercises = action.payload;
    },
  },
});

export const { setSelectedDate, setBodyPart, setExercises } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
