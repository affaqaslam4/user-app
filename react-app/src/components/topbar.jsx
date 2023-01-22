import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export const TopBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const onLogout = () => {
    setUser(null);
    navigate("/");
  };
  return (
    <div className="top-bar">
      <Button variant="contained" onClick={onLogout}>
        Logout
      </Button>
      <p>
        {user?.name}/{user?.email}
      </p>
    </div>
  );
};
