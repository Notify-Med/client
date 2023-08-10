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

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/users";

const Register = () => {
  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(ColorModeContext);
  console.log("mode :", theme.palette.mode);

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

      console.log(response.data);
      setSuccess(true);
      setUser("");
      setEmail("");
      setPwd("");
      setErrMsg("");
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
      <form onSubmit={handleSubmit}>
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
          id="name"
          label="Full Name"
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
          label="Password"
          variant="standard"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
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

        <Box
          display={"flex"}
          justifyContent={"center"}
          p={5}
          flexDirection="column"
          alignItems="center"
        >
          <Button type="submit" variant="contained" 
            sx={{ 
              backgroundColor: "rgb(31, 137, 230)",
              color: "white",
              "&:hover": {
                backgroundColor: "#00a6fb", 
                color:"white",
              },
              width: "100%",
              marginTop: "30px"
            }}>
            
            Submit
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
