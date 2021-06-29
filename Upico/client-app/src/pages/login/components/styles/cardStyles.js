import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  cardSignin: {
    maxWidth: 500,
    alignItem: "center",
    textAlign: "center",
    backgroundColor: "#2a3f54",
    opacity: 0.9,
    borderRadius: "10px",
    border: "2px solid #009688",
    "&[animate='1']": {
      animation: `$toLeft .8s ${theme.transitions.easing.easeInOut}`,
    },
    "&[animate='0']": {
      animation: `$moveIn .3s ${theme.transitions.easing.easeInOut}`,
    },
  },
  cardSignup: {
    maxWidth: 500,
    alignItem: "center",
    textAlign: "center",
    backgroundColor: "#2a3f54",
    opacity: 0.9,
    borderRadius: "10px",
    border: "2px solid #009688",
    "&[animate='1']": {
      animation: `$toRight .8s ${theme.transitions.easing.easeInOut}`,
    },
    "&[animate='0']": {
      animation: `$moveIn .3s ${theme.transitions.easing.easeInOut}`,
    },
  },
  logo: {
    marginTop: 10,
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#8E8E8E",
    textTransform: "uppercase",
    textAlign: "left",
  },
  textField: {
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#109cbb",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#8E8E8E",
    },
    "&:hover .MuiInput-underline:before": {
      borderBottomColor: "#8E8E8E",
    },
    "& .MuiFormHelperText-root": {
      color: "red",
    },
  },
  cardAction: {
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: 40,
  },
  button: {
    width: "80%",
    marginBottom: 10,
    color: "#109cbb",
    fontWeight: "bold",
    borderColor: "#109cbb",
    "&:hover": {
      backgroundColor: "#109cbb",
      color: "white",
    },
  },
  link: {
    fontSize: 12,
    color: "#8E8E8E",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  signUp: {
    textDecoration: "none",
    color: "#109cbb",
    marginLeft: "5px",
    "&:hover": {
      textDecoration: "none",
    },
  },
  "@keyframes toLeft": {
    "0%": {
      opacity: 0.9,
      transform: "translateX(0)",
    },
    "100%": {
      opacity: 0,
      transform: "translateX(-105%)",
    },
  },
  "@keyframes toRight": {
    "0%": {
      opacity: 0.9,
      transform: "translateX(0)",
    },
    "100%": {
      opacity: 0,
      transform: "translateX(105%)",
    },
  },
  "@keyframes moveIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 0.9,
    },
  },
}));
