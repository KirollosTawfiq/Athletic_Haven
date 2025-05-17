import React from "react";
import { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";
import { useDispatch, useSelector } from "react-redux";
import {
  setExercises,
  setSearch,
  setBodyPart,
} from "../features/exerciseSlice";

const SearchExercises = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.exercise.search);
  const bodyPart = useSelector((state) => state.exercise.bodyPart);
  const [bodyParts, setBodyParts] = useState([]);

  const fetchExercisesData = async () => {
    const bodyPartsData = await fetchData(
      "https://exercisedb.p.rapidapi.com/exercises/bodyPartList?limit=1400",
      exerciseOptions
    );
    setBodyParts(["all", ...bodyPartsData]);
  };

  useEffect(() => {
    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=1400",
        exerciseOptions
      );
      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );
      dispatch(setExercises(searchedExercises));
      dispatch(setSearch("")); // clear search box
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center"
      >
        Powerful Workouts You
        <br />
        Need to Try!
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value.toLowerCase()))}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handleSearch}
        >
          <a
            className="search-btn-link"
            href="#exercises"
            style={{ textDecoration: "none", color: "#fffafb", width: "100%" }}
          >
            Search
          </a>
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={(val) => dispatch(setBodyPart(val))}
          isBodyParts
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
