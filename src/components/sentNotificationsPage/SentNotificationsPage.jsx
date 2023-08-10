import React, { useEffect, useState, useRef } from "react";
import SentNotificationCard from "./components/SentNotificationCard";
import { Box, Autocomplete, TextField, Button, Popper, Divider } from "@mui/material";
import { createStyles } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
  const { usersEmails, setUsersEmails } = useContext(AuthContext);

  const [sentNotifs, setSentNotifs] = useState([]);
  const [shownSentNotifs, setShownSentNotifs] = useState([]);
  const [receivers, setReceivers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get("/users/all");
    setUsersEmails(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUsers();
    };
    fetchData();
  }, []);

  const getSentNotifs = async () => {
    try {
      const res = await axios.get("/notifications/sent", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          withCredentials: true,
        },
      });
      setSentNotifs(res.data);
      setShownSentNotifs(res.data);
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

  // START Auto Complete ----------------------------------------------------------

  const getEmails = (receiverlistofobj) => {
    let emails = [];
    for (let i = 0; i < receiverlistofobj.length; i++) {
      emails.push(receiverlistofobj[i].email);
    }
    return emails;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(receivers);
    setShownSentNotifs([]);
    for (let i = 0; i < receivers.length; i++) {
      for (let j = 0; j < sentNotifs.length; j++) {
        const emails = getEmails(sentNotifs[j].receivers);
        if (emails.includes(receivers[i])) {
          setShownSentNotifs((prev) => [...prev, sentNotifs[j]]);
        }
      }
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setShownSentNotifs(sentNotifs);
  };

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        "& .MuiAutocomplete-listbox": {
          backgroundColor: theme.palette.background.popper,
          "& li": {
            color: theme.palette.mode === "dark" ? "white" : undefined,
          },
        },
      },
    })
  );

  function CustomPopper(props) {
    const classes = useStyles(props.theme);

    return (
      <Popper
        {...props}
        className={classes.root}
        placement="bottom"
        elevation={5}
      />
    );
  }

  // END Auto Complete ------------------------------------------------------------


  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      p={5}
      flexDirection="column"
      alignItems="center"
    > <h1>Sent Notifications</h1>
      <Box width={"70%"} overflow="auto" height={"100%"}style={{ border: ".5px solid ", borderRadius: "10px", padding: "10px", borderColor:"#adb5bd" }}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          p={1}
          flexDirection="column"
          alignItems="center"
          
        >
          
         
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", width: "100%" }}
          >
            <label style={{ width: "100%", marginTop:"50px", marginLeft:"50px"}}>filter by email :</label>

            <Autocomplete
              style={{
                width: "100%",
                marginTop: "30px",
          
              }}
              PopperComponent={CustomPopper}
              multiple
              id="tags-outlined"
              options={usersEmails}
              filterSelectedOptions
              onChange={(event, value) => {
                setReceivers(value);
                console.log("value", value);
              }}
              renderInput={(params) => (
                
                <TextField
                  {...params}
                  variant="standard"
                  label="Receivers"
                  id="emails"
                  placeholder="Receivers"
                />
              )}
            />

            <Box
              display={"flex"}
              justifyContent={"center"}
              p={5}
              flexDirection="column"
              alignItems="center"
            >
              
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.hover, 
                    color: theme.palette.primary.main,
                  },
                }}
                className="submitB"
              >
                {" "}
                Submit
              </Button>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              p={5}
              alignItems="center"
            >
              <Button
                type="button"
                variant="contained"
                sx={{
                  width: "100px", 
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.hover, 
                    color: theme.palette.primary.main,
                  },
                }}
                className="submitB"
                onClick={handleReset}
              
              >
                Show all
              </Button>
              
            </Box>
           
          </form>
        </Box>
        <Box px={5} py={3}>
        <Divider style={{ marginBottom:"50px" }} />
          {/* <SentNotificationCard
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
          /> */}
          {shownSentNotifs &&
          shownSentNotifs.length > 0 &&
          Array.isArray(shownSentNotifs) ? (
            shownSentNotifs.map((notification, index) => (
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
