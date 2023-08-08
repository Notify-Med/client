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
  
  const { socket } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const response = await axios.get(`/notifications/${type}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const notificationsData = await getNotifications();
      setNotifications(notificationsData);
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
