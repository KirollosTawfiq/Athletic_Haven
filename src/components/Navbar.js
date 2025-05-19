import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import MainLogo from "../assets/images/App-Main-Logo.png";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      sx={{
        gap: { sm: "122px", xs: "40px" },
        mt: { sm: "32px", xs: "20px" },
        justifyContent: "none",
        px: "20px",
      }}
    >
      <Link to="/">
        <img
          src={MainLogo}
          alt="logo"
          style={{ width: "150px", height: "50px", margin: "0 20px" }}
        />
      </Link>
      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#3A1212",
          }}
          className="nav"
        >
          Home
        </Link>

        <a
          href="/#exercises"
          style={{
            textDecoration: "none",
            color: "#3A1212",
          }}
          className="nav"
        >
          Exercises
        </a>

        <Link
          to="/schedule"
          style={{
            textDecoration: "none",
            color: "#3A1212",
          }}
          className="nav"
        >
          Schedule
        </Link>
      </Stack>
    </Stack>
  );
};

export default Navbar;
