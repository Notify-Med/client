import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import NotificationCard from "./NotificationCard";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "../../../api/axios.js";

function NotificationScroll({ type }) {
  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(AuthContext);
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
    const response = await axios.get(`/notifications/${type}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
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
    socket.on("update", () => {
      console.log("New notification created");
      getNotifications(); // Fetch the latest notifications
    });
  }, []);

  return (
    <Box backgroundColor={theme.palette.background.popper} px={5} py={3}>
      {/* <NotificationCard
        notification={{
          title: "Notification title",
          date: "2021-10-10",
          senderName: "Sender name",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet",
        }}
      /> */}
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
  );
}

export default NotificationScroll;
