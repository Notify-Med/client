import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

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
      <Typography variant={"h"} sx={{ color: theme.palette.text.light }}>
        to:
      </Typography>
      <List sx={{ width: "100%" }}>
        {notification.receivers.map((value, index) => (
          <ListItem disablePadding key={index}>
            <ListItemIcon>
              {value.log ? <DoneAllOutlinedIcon /> : <CheckOutlinedIcon />}
            </ListItemIcon>
            <ListItemText primary={`${value.email}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant={"body1"}>{notification.description}</Typography>
    </Box>
  );
}

export default SentNotificationCard;
