import React from "react";
import { Box, Typography, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, exerciseOptions } from "../utils/fetchData";
import ExerciseCard from "../components/ExerciseCard";
import {
  setSelectedDate,
  setBodyPart,
  setExercises,
} from "../features/scheduleSlice";

const bodyPartsList = ["chest", "back", "legs", "shoulders", "arms", "cardio"];

const Schedule = () => {
  const dispatch = useDispatch();
  const { selectedDate, bodyPart, exercises } = useSelector(
    (state) => state.schedule
  );

  const handleDateChange = async (newDate) => {
    dispatch(setSelectedDate(newDate));

    let validExercises = [];
    let attempts = 0;

    while (!Array.isArray(validExercises) || validExercises.length === 0) {
      if (attempts >= 3) {
        break;
      }

      const randomBodyPart =
        bodyPartsList[Math.floor(Math.random() * bodyPartsList.length)];
      dispatch(setBodyPart(randomBodyPart));

      try {
        const result = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${randomBodyPart}?limit=10`,
          exerciseOptions
        );

        if (Array.isArray(result) && result.length > 0) {
          validExercises = result;
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }

      attempts++;
    }

    dispatch(setExercises(validExercises));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box p={4}>
        <Stack
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Typography variant="h4" mb={4}>
            Select a Day to Generate Your Workout
          </Typography>

          <DatePicker
            label="Choose your workout day"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "400px" }} />
            )}
          />
        </Stack>

        {bodyPart && (
          <>
            <Typography variant="h4" mt={7} ml={10}>
              Time to do some{" "}
              <span
                style={{
                  color: "#ff2625",
                  textTransform: "capitalize",
                  fontSize: "40px",
                }}
              >
                {bodyPart}
              </span>{" "}
              exercises:
            </Typography>

            <Stack
              direction="row"
              flexWrap="wrap"
              gap={4}
              mt={6}
              justifyContent="center"
            >
              {Array.isArray(exercises) && exercises.length > 0
                ? exercises.map((e, index) => (
                    <ExerciseCard key={index} exercise={e} />
                  ))
                : ""}
            </Stack>
          </>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default Schedule;
