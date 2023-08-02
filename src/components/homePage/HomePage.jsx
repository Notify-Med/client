import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import axios from "../../api/axios.js";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@mui/material";
import NotificationForm from "../notificationForm/NotificationForm";
import NotificationCard from "./components/NotificationCard";

function Homepage() {
  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(ColorModeContext);

  const { socket } = useContext(AuthContext);

  const [notifications, setNotification] = useState([]); // ["email1", "email2"]

  // const getNotifications = async (req, res) => {
  //   const response = await axios.get("/notifications", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   console.log(response.data);
  // };

  const getNotifications = async () => {
    const response = await axios.post("/notifications", {
      id: localStorage.getItem("id"), //to change to get with header authorization
    });
    console.log(response.data);
    setNotification(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getNotifications();
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Event listener for "newNotificationCreated" event
    socket.on("newNotificationCreated", () => {
      console.log("New notification created");
      getNotifications(); // Fetch the latest notifications
    });
  }, []);

  return (
    <Box position={"relative"}>
      <Box width={"70vw"} height={"calc(100vh - 100px)"}>
        <NotificationForm p={20} />
      </Box>
      <Box
        width={"30vw"}
        backgroundColor={theme.palette.background.popper}
        px={5}
        py={3}
        overflow="auto"
        position="absolute"
        right={0}
        top={0}
        height={"100%"}
      >
        <NotificationCard
          notification={{
            title: "Notification title",
            date: "2021-10-10",
            sender: "Sender name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet",
          }}
        />
        {notifications &&
        notifications.length > 0 &&
        Array.isArray(notifications) ? (
          notifications.map((notification, index) => (
            <NotificationCard notification={notification} key={index} />
          ))
        ) : (
          <Box>No notifications</Box>
        )}
      </Box>
    </Box>
  );
}

export default Homepage;
