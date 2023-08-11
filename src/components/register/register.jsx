import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import tmpaLogo from "../../images/tmpaLogoOnly.png";
import React, { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { TextField, useTheme } from "@mui/material";
import { useState } from "react";
import axios from "../../api/axios.js";
import "./register.css";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from "react-router-dom";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/users";

const Register = () => {
  const navigate = useNavigate(); 

  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(ColorModeContext);

  //submiting data logic with axios:

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);

    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        {
          name: user,
          email,
          password: pwd,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSuccess(true);
      setUser("");
      setEmail("");
      setPwd("");
      setErrMsg("");

      navigate("/login");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      p={5}
      flexDirection="column"
      alignItems="center"
    >
      <img src={tmpaLogo} alt="tmpa Logo" height={80} />
      <h2>Sign Up</h2>
      <form onSubmit={(e) => {
      e.preventDefault();
      setSubmitted(true); // Mark the form as submitted
      handleSubmit(e);
    }}>
        <TextField
          sx={{
            "& label.Mui-focused": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.light
                  : undefined,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor:
                theme.palette.mode === "dark"
                  ? theme.palette.text.light
                  : undefined,
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.light
                    : undefined,
              },
            width: "100%",
            marginTop: "25px",
          }}
          error={submitted && !USER_REGEX.test(user)} // Apply error after form submission and invalid input
          helperText={submitted && !USER_REGEX.test(user) ? "Enter a valid username (4 characters)" : "Enter a username"}
          id="name"
          label="Username"
          variant="standard"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          onFocus={() => setErrMsg("")}
        />
        <TextField
          id="email"
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={submitted && !EMAIL_REGEX.test(email)} // Apply error after form submission and invalid input
          helperText={submitted && !EMAIL_REGEX.test(email) ? "Enter a valid email address" : "Enter an email address"}
          sx={{
            "& label.Mui-focused": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.light
                  : undefined,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor:
                theme.palette.mode === "dark"
                  ? theme.palette.text.light
                  : undefined,
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.light
                    : undefined,
              },
            width: "100%",
            marginTop: "30px",
          }}
        />

        <TextField
          id="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          variant="standard"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          error={submitted && !PWD_REGEX.test(pwd)} // Apply error after form submission and invalid input
          helperText={submitted && !PWD_REGEX.test(pwd) ? "Enter a strong password (8-24 characters) with at least one lowercase letter, one uppercase letter, one digit, and one special character" : "Enter a strong password (8-24 characters) with at least one lowercase letter, one uppercase letter, one digit, and one special character"}
          sx={{
            "& label.Mui-focused": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.light
                  : undefined,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor:
                theme.palette.mode === "dark"
                  ? theme.palette.text.light
                  : undefined,
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.light
                    : undefined,
              },
            width: "100%",
            marginTop: "30px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Box
          display={"flex"}
          justifyContent={"center"}
          p={5}
          flexDirection="column"
          alignItems="center"
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "rgb(31, 137, 230)",
              color: "white",
              "&:hover": {
                backgroundColor: "#00a6fb",
                color: "white",
              },
              width: "100%",
              marginTop: "30px",
            }}
          >
            Register
          </Button>
        </Box>
      </form>
      {errMsg && <Alert severity="error">{errMsg}</Alert>}
      {success && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          User Created successfully.
        </Alert>
      )}
    </Box>
  );
};

export default Register;
