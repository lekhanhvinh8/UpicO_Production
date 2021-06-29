import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    width: "15%",
    position: "fixed",
    top: 100,
    right: 40,
  },
  header: {
    backgroundColor: "#2a3f54",
    padding: 10,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  headerText: {
    fontSize: 13,
    color: "#009688",
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
  },
  suggest: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  info: {
    width: "100%",
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    cursor: "pointer",
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    cursor: "pointer",
  },
  desc: {
    fontSize: 12,
    color: "#8E8E8E",
  },
  icon: {
    color: "#009688",
    float: "right",
    cursor: "pointer",
  },
}));
