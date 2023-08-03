import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../theme";
import Button from "@mui/material/Button";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsModeOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonModeOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { notifShown, setNotifShown } = useContext(AuthContext);
  // Function to check if the user is authenticated using localStorage
  const isUserAuthenticated = () => {
    const authToken = localStorage.getItem("accessToken");
    return authToken !== null; // If authToken exists in localStorage, user is authenticated, otherwise not.
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Run the authentication check on component mount (page load)
  useEffect(() => {
    setIsLoggedIn(isUserAuthenticated()); // Update the state based on authentication status
  }, [setIsLoggedIn]);
  // NAVIGATION
  const navigate = useNavigate(); // Get the navigation function
  // Navigate to the '/register' route
  const RegisterRoute = () => {
    navigate("/register");
  };
  // Navigate to the '/register' route
  const LoginRoute = () => {
    navigate("/login");
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const outlinedButtonColor = colors.primary[100];
  const buttonTextcolor = colors.primary[100];
  const outlinedButtonStyle = {
    borderColor: outlinedButtonColor,
    color: buttonTextcolor,
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} height={"100px"}>
      <h2>NotifyMed</h2>

      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>

        {isLoggedIn ? (
          // Render these elements when the user is logged in
          <>
            <IconButton
              onClick={() => {
                setNotifShown(!notifShown);
                console.log(notifShown);
              }}
            >
              <NotificationsModeOutlinedIcon />
            </IconButton>
            <IconButton>
              <PersonModeOutlinedIcon />
            </IconButton>
            <Button
              variant="text"
              style={{ color: buttonTextcolor }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </>
        ) : (
          // Render these elements when the user is not logged in
          <>
            <Button
              variant="text"
              style={{ color: buttonTextcolor }}
              onClick={LoginRoute}
            >
              Log In
            </Button>
            <Button
              variant="outlined"
              style={outlinedButtonStyle}
              onClick={RegisterRoute}
            >
              Register
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
