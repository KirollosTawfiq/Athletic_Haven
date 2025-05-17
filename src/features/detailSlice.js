import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exerciseDetail: {},
  targetMuscleExercises: [],
  equipmentExercises: [],
};

const detailSlice = createSlice({
  name: "exerciseDetail",
  initialState,
  reducers: {
    setExerciseDetail: (state, action) => {
      state.exerciseDetail = action.payload;
    },
    setTargetMuscleExercises: (state, action) => {
      state.targetMuscleExercises = action.payload;
    },
    setEquipmentExercises: (state, action) => {
      state.equipmentExercises = action.payload;
    },
  },
});

export const {
  setExerciseDetail,
  setTargetMuscleExercises,
  setEquipmentExercises,
} = detailSlice.actions;

export default detailSlice.reducer;
