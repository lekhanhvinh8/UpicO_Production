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
  },
  username: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1,
  },
  infoText: {
    fontWeight: "bold",
    textAlign: "right",
    flex: "1 0 0px",
    fontSize: 14,
  },
  textField: {
    width: "75%",
    "& .MuiFormHelperText-root": {
      margin: "10px 0 0 0",
    },
  },
  input: {
    padding: "5px 10px",
  },
}));
