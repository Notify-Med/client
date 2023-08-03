import { createStyles } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Popper from "@mui/material/Popper";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       "& .MuiAutocomplete-listbox": {
//         border: `20px solid white`,
//         backgroundColor: theme.palette.background.primary,
//         color: theme.palette.text.light,
//       },
//     },
//   })
// );

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiAutocomplete-listbox": {
        border: `20px solid grey`,
        fontSize: "20px",
        "& li": {
          backgroundColor: "white",
        },
      },
    },
  })
);

export default function CustomPopper(props) {
  const classes = useStyles(props.theme);

  return <Popper className={classes.root} placement="bottom" elevation={5} />;
}
