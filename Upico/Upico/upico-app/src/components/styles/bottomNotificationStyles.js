import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100vw",
    padding: "10px 20px",
    backgroundColor: "#262626",
    boxSizing: "border-box",
    color: "white",
    animation: "$slideFromBottom 0.5s linear",
    display: "none",
    "&[active='1']": {
      display: "block",
    },
  },
  "@keyframes slideFromBottom": {
    "0%": {
      transform: "translateY(100%)",
    },
    "100%": {
      transform: "translateY(0)",
    },
  },
  "@keyframes slideToBottom": {
    "0%": {
      transform: "translateY(0)",
    },
    "100%": {
      transform: "translateY(100%)",
    },
  },
}));
