import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import tmpaLogo from "../../images/tmpaLogoOnly.png";
import React from "react";
import { ColorModeContext, tokens } from "../../theme";
import { TextField, useTheme } from "@mui/material";
import axios from "../../api/axios.js";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';



const LOGIN_URL = "/users/login";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(ColorModeContext);
  // console.log("mode :", theme.palette.mode);

  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();
  //const HomeRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

 

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);


  const handleSubmit = async (e) => {
    e.preventDefault(); //disable the default behavior of the form which will reload the page

    try {
      const response = await axios.post(
        LOGIN_URL,
        { email, password: pwd },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.token;

      // Store the token in a cookie (using js-cookie)

      console.log("accessToken:", accessToken); // Add this line to check the value
      localStorage.setItem("accessToken", response?.data?.token);
      console.log("id: ", response?.data?._id);
      localStorage.setItem("id", response?.data?._id);

      setAuth({ email, pwd, accessToken });
      setEmail("");
      setPwd("");
      setSuccess(true);
      setIsLoggedIn(true);
      //HomeRef.current.click();
      navigate("/Home");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
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
      <h2>Log In To Your Account</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          variant="standard"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
        {/* <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
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
        /> */}

        <TextField
          id="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          variant="standard"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
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
              backgroundColor: "#1f89e6",
              color: "white",
              "&:hover": {
                backgroundColor: "#00a6fb",
                color: "white",
              },
              width: "100%",
              marginTop: "30px",
            }}
          >
            Log In
          </Button>
        </Box>
      </form>
      {errMsg && <Alert severity="error">{errMsg}</Alert>}
      {success && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          User logged in successfully.
        </Alert>
      )}
    </Box>
  );
};
export default Login;
