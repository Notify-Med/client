import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";

function NotificationCard({ notification }) {
  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(ColorModeContext);
  const [log, setLog] = useState(notification.log);

  const { socket } = useContext(AuthContext);

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
      p={2}
      mt={2}
      mb={2}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      backgroundColor={theme.palette.background.default}
      borderRadius={5}
      position={"relative"}
    >
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
        <Typography variant={"h6"} sx={{ color: theme.palette.text.light }}>
          {notification.date}
        </Typography>
      </Box>
      <Typography
        variant={"h"}
        sx={{ color: theme.palette.text.light, marginBottom: "10px" }}
      >
        {notification.sender}
      </Typography>
      <Typography variant={"body1"}>{notification.description}</Typography>
      {
        <Box
          position={"absolute"}
          right="10px"
          bottom={"10px"}
          width={"15px"}
          height={"15px"}
          borderRadius={"50%"}
          backgroundColor={
            !notification.log ? "white" : theme.palette.background.default
          }
          onClick={handleLog}
        ></Box>
      }
    </Box>
  );
}

export default NotificationCard;
