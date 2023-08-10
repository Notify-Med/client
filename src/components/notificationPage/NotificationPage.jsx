import { Box, Card } from "@mui/material";
import NotificationScroll from "../homePage/components/NotificationScroll";

function NotificationPage() {
  return (
    
    <Box
      display={"flex"}
      justifyContent={"center"}
      p={5}
      flexDirection="column"
      alignItems="center"
    >
      <h1>Received Notifications</h1>
      <Box width={"60%"} overflow="auto" height={"100%"}
      style={{ border: "1px solid ", borderRadius: "10px", padding: "10px" , borderColor:"#adb5bd"}}>

        <NotificationScroll type="all" />
      </Box>
    </Box>
  );
}

export default NotificationPage;
