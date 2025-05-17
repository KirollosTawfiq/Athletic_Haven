import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Logo from "../assets/images/App-Main-Logo.png";

const Footer = () => {
  return (
    <Box mt="80px">
      <Stack gap="40px" alignItems="center" px="40px" pt="24px">
        <img src={Logo} alt="logo" width="150px" height="50px" bgcolor="#fff" />
        <Typography variant="h5" pb="20px" mt="-15px">
          <i>Stronger Every Day, Fitter Every Way</i>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
