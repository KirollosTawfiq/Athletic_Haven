import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Schedule from "./components/Schedule";

// COMPONENTS
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// PAGES
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetail";

// MATERIAL UI
import { Box } from "@mui/material";

const App = () => {
  return (
    <Box width="400px" sx={{ width: { xl: "1488px" } }} m="auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>

      <Footer />
    </Box>
  );
};

export default App;
