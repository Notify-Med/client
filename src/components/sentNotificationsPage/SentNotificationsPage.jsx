import React, { useEffect } from "react";
import SentNotificationCard from "./components/SentNotificationCard";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";

function SentNotificationsPage() {
  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(AuthContext);
  const { socket } = useContext(AuthContext);

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
    const fetchData = async () => {
      await getSentNotifs();
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Event listener for "newNotificationCreated" event
    socket.on("update", () => {
      getSentNotifs(); // Fetch the latest notifications
    });
  }, []);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      p={5}
      flexDirection="column"
      alignItems="center"
    >
      <Box width={"50vw"} overflow="auto" height={"100%"}>
        <Box backgroundColor={theme.palette.background.popper} px={5} py={3}>
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
      </Box>
    </Box>
  );
}

export default SentNotificationsPage;
