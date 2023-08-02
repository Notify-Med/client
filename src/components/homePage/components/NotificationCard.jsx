import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { ColorModeContext, tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@mui/material";

function NotificationCard({ notification }) {
  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(ColorModeContext);

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
    </Box>
  );
}

export default NotificationCard;
