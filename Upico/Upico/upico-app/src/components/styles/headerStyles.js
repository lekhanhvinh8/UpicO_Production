import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: "#2a3f54",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  container: {
    height: 60,
    padding: "0 40px",
  },
  logo: {
    width: "60%",
    height: "auto",
    cursor: "pointer",
  },
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 25,
    borderRadius: 3,
    "&:hover": {
      cursor: "text",
    },
  },
  searchBox: {
    position: "absolute",
    width: "120%",
    height: 300,
    left: "-10%",
    top: 40,
    flexDirection: "column",
    flexShrink: 0,
    display: "none",
    "&[active='1']": {
      display: "flex",
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: 14,
      height: 14,
      backgroundColor: "white",
      left: "50%",
      top: -7,
      transform: "rotate(45deg)",
    },
  },
  searchBoxContent: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "20%",
    "&[search='1']": {
      width: "100%",
    },
  },
  icon: {
    color: "#009688",
    "&[icon='search']": {
      color: "lightgray",
    },
    fontSize: 27,
  },
  iconButton: {
    padding: 5,
  },
  avatarContainer: {
    padding: 10,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  avatar: {
    width: 27,
    height: 27,
    marginRight: 10,
  },
  user: {
    position: "absolute",
    right: 0,
    bottom: -65,
    width: 100,
    display: "none",
    "&[active='1']": {
      display: "block",
    },
  },
  option: {
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#d9d9d9",
    },
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
  },
  searchUser: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#d9d9d9",
    },
  },
  progress: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
}));
