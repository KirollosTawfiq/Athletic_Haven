import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bodyPart: "all",
  exercises: [],
  currentPage: 1,
  search: "",
};

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setBodyPart: (state, action) => {
      state.bodyPart = action.payload;
    },
    setExercises: (state, action) => {
      state.exercises = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setBodyPart, setExercises, setCurrentPage, setSearch } =
  exerciseSlice.actions;
export default exerciseSlice.reducer;
