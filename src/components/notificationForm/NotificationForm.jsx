import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import { ColorModeContext, tokens } from "../../theme";
import { TextField, useTheme } from "@mui/material";
import axios from "../../api/axios.js";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { createStyles } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Popper from "@mui/material/Popper";

const NotificationForm = ({ p }) => {
  const theme = useTheme();
  tokens(theme.palette.mode);
  useContext(ColorModeContext);

  const { socket } = useContext(AuthContext);

  const titleRef = useRef();
  const autoCompleteRef = useRef();

  const { usersEmails, setUsersEmails } = useContext(AuthContext); // ["email1", "email2"]
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [receivers, setReceivers] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    titleRef.current.focus();
    const fetchData = async () => {
      await getUsers();
    };
    fetchData();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [title, description]);

  const getUsers = async () => {
    const response = await axios.get("/users/all");
    setUsersEmails(response.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("createNotification", {
      title,
      description,
      receivers,
      id: localStorage.getItem("id"),
    });
    socket.on("notificationCreated", (notification) => {
      console.log("Notification created:", notification);

      setTitle("");
      setDescription("");

      // Update your app state or UI with the received notification
    });
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

  // END CUSTOM POPPER ------------------------------------------------------------

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      p={5 + p}
      flexDirection="column"
      alignItems="center"
    >
      <h2>Send Notification</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          id="title"
          label="Title"
          variant="standard"
          ref={titleRef}
          autoComplete="off"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          sx={{
            "& label.Mui-focused": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.light
                  : undefined,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor:
                theme.palette.mode === "dark"
                  ? theme.palette.text.light
                  : undefined,
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.light
                    : undefined,
              },
            width: "100%",
            marginTop: "30px",
          }}
        />
        <TextField
          id="description"
          label="Description"
          variant="standard"
          multiline
          type="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
          sx={{
            "& label.Mui-focused": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.light
                  : undefined,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor:
                theme.palette.mode === "dark"
                  ? theme.palette.text.light
                  : undefined,
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.light
                    : undefined,
              },
            width: "100%",
            marginTop: "30px",
          }}
        />
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
          ref={autoCompleteRef}
          onChange={(event, value) => {
            setReceivers(value);
            console.log("value", value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Receivers"
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
          <Button type="submit" variant="contained" sx={{}} className="submitB">
            {" "}
            Submit
          </Button>
        </Box>
      </form>
      {errMsg && <Alert severity="error">{errMsg}</Alert>}
      {success && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          User logged in successfully.
        </Alert>
      )}
    </Box>
  );
};
export default NotificationForm;
