import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { ColorModeContext, tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

function SentNotificationCard({ notification }) {
  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(ColorModeContext);
  
  function formatDateTime(inputDateTime) {
    const dateObject = new Date(inputDateTime);
    const formattedDate = `${dateObject.toLocaleDateString()}, ${dateObject.toLocaleTimeString()}`;
    return formattedDate;
  }

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
      backgroundColor={theme.palette.background.popper}
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
          {formatDateTime(notification.date)}
        </Typography>
      </Box>
      <Typography variant={"h"} sx={{ color: theme.palette.text.light }}>
        to:
      </Typography>
      <List sx={{ width: "100%" }}>
  {notification.receivers.reduce(
    (acc, value) => {
      if (value.log) {
        acc.seen.push(value.email);
      } else {
        acc.unseen.push(value.email);
      }
      return acc;
    },
    { seen: [], unseen: [] }
  ).unseen.length > 0 && (
    <div>
      <ListItem disablePadding>
        <ListItemIcon>
          <CheckOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={`Unseen:`} />
      </ListItem>
      {notification.receivers.map((value, index) => (
        !value.log && (
          <ListItem key={index}>
            <ListItemText primary={`${value.email}`} />
          </ListItem>
        )
      ))}
    </div>
  )}
  {notification.receivers.reduce(
    (acc, value) => {
      if (value.log) {
        acc.seen.push(value.email);
      } else {
        acc.unseen.push(value.email);
      }
      return acc;
    },
    { seen: [], unseen: [] }
  ).seen.length > 0 && (
    <div>
      <ListItem disablePadding>
        <ListItemIcon>
          <DoneAllOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={`Seen:`} />
      </ListItem>
      {notification.receivers.map((value, index) => (
        value.log && (
          <ListItem key={index}>
            <ListItemText primary={`${value.email}`} />
          </ListItem>
        )
      ))}
    </div>
  )}
</List>

      <Typography variant={"body1"}>{notification.description}</Typography>
    </Box>
  );
}

export default SentNotificationCard;
