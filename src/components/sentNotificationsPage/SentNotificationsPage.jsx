import React, { useEffect } from "react";
import SentNotificationCard from "./components/SentNotificationCard";
import { Box } from "@mui/material";
import axios from "../../api/axios";

function SentNotificationsPage() {
  const [sentNotifs, setSentNotifs] = React.useState([]);

  const getSentNotifs = async () => {
    try {
      const res = await axios.get("/notifications/sent", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          withCredentials: true,
        },
      });
      setSentNotifs(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSentNotifs();
  }, []);

  return (
    <Box backgroundColor={"white"} px={5} py={3}>
      <SentNotificationCard
        notification={{
          title: "Notification title",
          date: "2021-10-10",
          sender: "Sender name",
          receivers: [
            { name: "receiver1", log: true },
            { name: "receiver2", log: false },
          ],
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet",
        }}
      />
      {sentNotifs && sentNotifs.length > 0 && Array.isArray(sentNotifs) ? (
        sentNotifs.map((notification, index) => (
          <SentNotificationCard notification={notification} key={index} />
        ))
      ) : (
        <Box>No sent Notifs</Box>
      )}
    </Box>
  );
}

export default SentNotificationsPage;
