import React, { useContext, useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import NotificationCard from "./NotificationCard";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios.js";

function NotificationScroll({ type }) {
  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(AuthContext);
  const { socket, setNotifAlert } = useContext(AuthContext);

  const [notifications, setNotifications] = useState([]); // ["email1", "email2"]

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
    if (response.data != notifications) {
      console.log("New notification created");

      setNotifications(response.data);
      setNotifAlert(true);
      setTimeout(() => {
        setNotifAlert(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const notificationsData = await getNotifications();
      if (Array.isArray(notificationsData)){
        setNotifications(notificationsData);
      }else{
        setNotifications([]);
      }
      console.log("Received notificationsData:", notificationsData);
    };
    fetchData();
  }, [type]); // Fetch when the "type" prop changes

  useEffect(() => {
    // Event listener for "newNotificationCreated" event
    socket.on("update", () => {
      console.log("New notification created");
      getNotifications().then(notificationsData => {
        setNotifications(notificationsData);
      });
    });
    
    // Clean up the socket listener when component unmounts
    return () => {
      socket.off("update");
    };
  }, [socket]);

  return (
    <Box px={5} py={3}>
      {notifications && notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index}>
            <NotificationCard notification={notification} />
            {index < notifications.length - 1 && (
              <Divider style={{ margin: '20px 0' }} />
            )}
          </div>
        ))
      ) : (
        <Box>No notifications</Box>
      )}
    </Box>
  );
}

export default NotificationScroll;
