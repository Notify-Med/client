import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

function NotificationCard({ notification }) {
  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(ColorModeContext);
  const [log, setLog] = useState(notification.log);

  const navigate = useNavigate();

  const { socket, setNotif } = useContext(AuthContext);

  const handleNavigate = (id) => {
    console.log("Notification: ", notification);
    setNotif(notification);
    navigate("/my-notifications/" + notification.id);
  };

  const handleLog = async () => {
    if (!log) {
      setLog(true);
      socket.emit("updateNotificationLog", {
        receiverId: localStorage.getItem("id"),
        notifId: notification.id,
      });
      socket.on("notificationLogUpdated", (notification) => {
        console.log("Notification log updated:", notification);
      });
      setLog(false);
    }
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      borderRadius={5}
      position={"relative"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width="100%"
      >
        <Box onClick={handleNavigate}>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            marginBottom={1}
          >
            <Typography variant={"h3"} sx={{ fontWeight: "600" }}>
              {notification.title}
            </Typography>
          </Box>
          <Typography
            variant={"h"}
            sx={{ color: theme.palette.text.light, marginBottom: "10px" }}
          >
            At : {notification.date}
          </Typography>
          <Typography
            sx={{ color: theme.palette.text.light, marginBottom: "10px" }}
          >
            Sender : {notification.sender}
          </Typography>
          {notification.description.length > 50 ? (
            <Typography variant={"body1"} sx={{ wordBreak: "break-word" }}>
              {notification.description.slice(0, 50)}
              <span style={{ color: theme.palette.text.light }}>
                ... See more
              </span>
            </Typography>
          ) : (
            <Typography variant={"body1"} sx={{ wordBreak: "break-word" }}>
              {notification.description}
            </Typography>
          )}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          {!notification.log ? (
            <Tooltip title="Check as seen" arrow>
              <RadioButtonUncheckedIcon
                sx={{ cursor: "pointer" }}
                onClick={handleLog}
              />
            </Tooltip>
          ) : (
            <RadioButtonCheckedIcon />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default NotificationCard;
