import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    width: "15%",
    borderRadius: 2,
    position: "fixed",
  },
  avatarContainer: {
    backgroundColor: "#2a3f54",
    padding: 10,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 13,
    color: "#009688",
    fontWeight: "bold",
  },
  content: {
    padding: 10,
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 2,
    border: "1px solid #eeeeee",
    padding: 5,
    marginRight: 10,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#009688",
    },
    "&:hover svg": {
      color: "white",
    },
  },
  icon: {
    color: "#009688",
    width: 20,
    height: 20,
  },
}));
