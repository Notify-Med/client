import { Box, IconButton, useTheme } from "@mui/material";
import Badge from "@mui/material/Badge";
import { ColorModeContext, tokens } from "../theme";
import Button from "@mui/material/Button";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsModeOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import * as React from "react";
import NotificationScroll from "../components/homePage/components/NotificationScroll";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import axios from "../api/axios.js";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { notifShown, setNotifShown, socket } = useContext(AuthContext);
  // Function to check if the user is authenticated using localStorage
  const isUserAuthenticated = () => {
    const authToken = localStorage.getItem("accessToken");
    return authToken !== null; // If authToken exists in localStorage, user is authenticated, otherwise not.
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    navigate("/login  ");
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

  const notifRoute = () => {
    navigate("/my-notifications");
  };
  const homeRoute = () => {
    navigate("/Home");
  };
  const sentRoute = () => {
    navigate("/sent-notifications");
  };

  const HomeRoute = () => {
    navigate("/");
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

  // BADGE FOR NEW NOTIFICATIONS ========
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  const checkForNewNotifications = () => {
    const newNotificationsExist = true; // MISSING THE LOGIC !!!!!
    setHasNewNotifications(newNotificationsExist);
  };

  // Call the function when the component mounts (or wherever appropriate)
  useEffect(() => {
    checkForNewNotifications();
  }, []);

  // NOTIFICATION MENU ================
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // badge for new notifications
  const checkNewNotifications = async () => {
    try {
      const response = await axios.get(`/notifications/new`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      return data.length > 0 && Array.isArray(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const newNotificationsExist = await checkNewNotifications();
      setHasNewNotifications(newNotificationsExist);
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("update", () => {
      console.log(hasNewNotifications);
      checkNewNotifications().then((newNotificationsExist) => {
        setHasNewNotifications(newNotificationsExist);
      });
    });
  }, []);

  return (
    <Box display="flex" justifyContent="space-between" p={2} height={"100px"}>
      <h2 onClick={HomeRoute} style={{ cursor: "pointer" }}>
        NotifyMed
      </h2>

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
            <IconButton onClick={sentRoute}>
              <Tooltip title="Sent Notifications" arrow>
                <SendOutlinedIcon />
              </Tooltip>
            </IconButton>

            <IconButton onClick={notifRoute}>
              <Tooltip title="Received Notifications" arrow>
                <MailOutlineOutlinedIcon />
              </Tooltip>
            </IconButton>

            <IconButton
              onClick={() => {
                setNotifShown(!notifShown);
              }}
            >
              {hasNewNotifications ? (
                <Badge
                  variant="dot"
                  color="secondary"
                  overlap="circular"
                  invisible={!hasNewNotifications}
                >
                  <NotificationsModeOutlinedIcon onClick={handleClick} />
                </Badge>
              ) : (
                <NotificationsModeOutlinedIcon onClick={handleClick} />
              )}
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  width: { xs: "70%", md: "30%" },
                  maxHeight: "400px", // Set the maximum height
                  overflowY: "auto", // Enable vertical scrolling
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 10,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <NotificationScroll type="new" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <MenuItem
                  sx={{ width: "auto", margin: "0 auto" }}
                  onClick={(event) => {
                    // Prevent event propagation to Menu
                    event.stopPropagation();
                    handleClose();
                  }}
                >
                  Close
                </MenuItem>
              </div>
            </Menu>
            <IconButton onClick={homeRoute}>
              <AddCircleOutlineIcon />
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
