import { TextField, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const isEmailValid = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (
      email === null ||
      !isEmailValid ||
      password === null ||
      password.length < 8
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [email, password]);

  const onLogin = () => {
    const body = {
      email,
      password,
    };
    axios
      .post("http://localhost:5000/api/login", body)
      .then((res) => {
        console.log(res);
        const {
          data: { success, user, error },
        } = res;
        if (success) {
          setEmail("");
          setPassword("");
          setUser(user);
          if (user.isAdmin) {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        } else {
          setShowError(true);
          setError(error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex-column login">
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <TextField
        className="text-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        type="email"
        variant="filled"
        required
      />
      <TextField
        className="text-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        type="password"
        variant="filled"
        required
      />
      <Button variant="contained" disabled={!isFormValid} onClick={onLogin}>
        Login
      </Button>
    </div>
  );
};
