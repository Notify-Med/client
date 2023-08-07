import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";

function SentNotificationCard({ notification }) {
  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(ColorModeContext);
  const [sentNotifs, setSentNotifs] = useState([]);

  return (
    <Box
      p={2}
      mt={2}
      mb={2}
      width={"50%"}
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
      <Typography variant={"h"} sx={{ color: theme.palette.text.light }}>
        {notification.sender}
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {notification.receivers.map((value, index) => (
          <ListItem
            sx={{ padding: "0" }}
            key={index}
            disableGutters
            secondaryAction={<Typography> {`${value.log}`} </Typography>}
          >
            <ListItemText primary={`${value.name}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant={"body1"}>{notification.description}</Typography>
    </Box>
  );
}

export default SentNotificationCard;
