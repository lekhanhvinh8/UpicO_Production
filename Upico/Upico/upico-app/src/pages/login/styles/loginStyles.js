import { makeStyles } from "@material-ui/core";
import background from "../../../assets/background.jpg";

export default makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  },
  container: {
    alignItems: "flex-end",
    minHeight: "100vh",
    paddingRight: "150px",
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
      paddingRight: 0,
    },
    "&[active='signup']": {
      alignItems: "center",
      paddingRight: "0px",
    },
  },
  card: {
    maxWidth: 500,
    alignItem: "center",
    textAlign: "center",
    backgroundColor: "#2a3f54",
    opacity: 0.9,
    borderRadius: "10px",
    border: "2px solid #009688",
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
    marginBottom: 30,
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
}));
