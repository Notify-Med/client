import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import axios from "../../api/axios.js";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import NotificationForm from "../notificationForm/NotificationForm";
import NotificationScroll from "./components/NotificationScroll";

function Homepage() {
  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(ColorModeContext);
  const { notifShown } = useContext(AuthContext);

  return (
    <Box position={"relative"}>
      <Box width={notifShown ? "70vw" : "100vw"} height={"calc(100vh - 100px)"}>
        <NotificationForm p={20} />
      </Box>
      <Box
        width={notifShown ? "30vw" : "0vw"}
        position="absolute"
        right={0}
        top={0}
        overflow="auto"
        height={"100%"}
      >
        <NotificationScroll type="new" />
      </Box>
    </Box>
  );
}

export default Homepage;
