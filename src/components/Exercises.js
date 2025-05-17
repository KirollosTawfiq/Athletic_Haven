import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import { useDispatch, useSelector } from "react-redux";
import { setExercises, setCurrentPage } from "../features/exerciseSlice";

const Exercises = () => {
  const dispatch = useDispatch();

  const exercises = useSelector((state) => state.exercise.exercises);
  const bodyPart = useSelector((state) => state.exercise.bodyPart);
  const currentPage = useSelector((state) => state.exercise.currentPage);

  const exercisesPerPage = 9;
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (e, value) => {
    dispatch(setCurrentPage(value));
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  const fetchExercisesData = async () => {
    let exercisesData = [];

    if (bodyPart === "all") {
      exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=1400",
        exerciseOptions
      );
    } else {
      exercisesData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=1400`,
        exerciseOptions
      );
    }

    dispatch(setExercises(exercisesData));
    dispatch(setCurrentPage(1)); // Reset page when bodyPart changes
  };

  useEffect(() => {
    fetchExercisesData();
  }, [bodyPart, dispatch]);

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h4" mb="46px">
        Showing Results:
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
