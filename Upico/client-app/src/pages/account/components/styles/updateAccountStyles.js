import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  gridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: "10px 0",
  },
  gridItemInfo: {
    marginLeft: 20,
    flex: "2 0 0px",
  },
  avatar: {
    width: 35,
    height: 35,
    marginLeft: "auto",
    cursor: "pointer",
    "&[loading='1']": {
      opacity: 0.5,
    },
  },
  username: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 0.5,
  },
  action: {
    padding: 0,
    margin: 0,
    backgroundColor: "white",
    border: "none",
    color: "#3f51b5",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 12,
  },
  infoText: {
    fontWeight: "bold",
    textAlign: "right",
    flex: "1 0 0px",
    fontSize: 14,
  },
  textField: {
    width: "75%",
  },
  textArea: {
    maxWidth: 312,
    minWidth: 312,
    width: 312,
    maxHeight: 312,
    minHeight: 50,
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: 4,
  },
  input: {
    padding: "5px 10px",
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
    color: "#8e8e8e",
    marginTop: 10,
    width: "75%",
  },
  progress: {
    position: "absolute",
    color: "#009688",
  },
  progressAvatar: {
    position: "absolute",
    color: "#009688",
    right: 10,
    top: 10,
  },
}));
