import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { fetchData, exerciseOptions } from "../utils/fetchData";
import Detail from "../components/Detail";
import SimilarExercises from "../components/SimilarExercises";
import { useDispatch, useSelector } from "react-redux";
import {
  setExerciseDetail,
  setTargetMuscleExercises,
  setEquipmentExercises,
} from "../features/detailSlice";

const ExerciseDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { exerciseDetail, targetMuscleExercises, equipmentExercises } =
    useSelector((state) => state.exerciseDetail);

  const fetchExercisesData = async () => {
    const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";

    const exerciseDetailData = await fetchData(
      `${exerciseDbUrl}/exercises/exercise/${id}`,
      exerciseOptions
    );
    dispatch(setExerciseDetail(exerciseDetailData));

    const targetMuscleExercisesData = await fetchData(
      `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
      exerciseOptions
    );
    dispatch(setTargetMuscleExercises(targetMuscleExercisesData));

    const equipmentExercisesData = await fetchData(
      `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
      exerciseOptions
    );
    dispatch(setEquipmentExercises(equipmentExercisesData));
  };

  useEffect(() => {
    fetchExercisesData();
  }, [id, dispatch]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
        bodyPart={exerciseDetail.bodyPart}
      />
    </Box>
  );
};

export default ExerciseDetail;
