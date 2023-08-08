import React, { useContext } from "react";
import { Alert, Box } from "@mui/material";
import AuthContext from "../context/AuthProvider";

function AlertNewNotif() {
  const { notifAlert } = useContext(AuthContext);
  return (
    <Box position="fixed" bottom={16} right={16} zIndex={9999} width="500px">
      {notifAlert && (
        <Alert severity="info">This is an info alert — check it out!</Alert>
      )}
    </Box>
  );
}

export default AlertNewNotif;
