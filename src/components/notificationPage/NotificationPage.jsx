import { Box } from "@mui/material";
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
      <Box width={"50vw"} overflow="auto" height={"100%"}>
        <NotificationScroll type="all" />
      </Box>
    </Box>
  );
}

export default NotificationPage;
