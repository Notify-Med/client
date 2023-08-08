import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

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
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width="100%">
      <Box>
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
          {notification.date}
        </Typography>
        <Typography
          sx={{ color: theme.palette.text.light, marginBottom: "10px" }}
        >
          Sender : {notification.date}
        </Typography>
        <Typography variant={"body1"}>{notification.description}</Typography>
      </Box>
      <Box display="flex"
          alignItems="center"
          justifyContent="flex-end">
      {
        <RadioButtonUncheckedIcon onClick={handleLog}  />
      }
      </Box>
      </Box>
    </Box>
  );
}

export default NotificationCard;
