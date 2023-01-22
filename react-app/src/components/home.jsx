import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { Login } from "./login";
import { Signup } from "./signup";

export const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box sx={{ height: "500px" }}>
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Log In" />
          <Tab label="Sign Up" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && (
          <Box>
            <Login />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <Signup />
          </Box>
        )}
      </Box>
    </Box>
  );
};
