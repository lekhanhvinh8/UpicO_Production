import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  avatar: {
    width: 30,
    height: 30,
    marginRight: 15,
    cursor: "pointer",
  },
  comment: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 13,
    marginRight: 10,
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
    },
  },
  timeAgo: {
    fontSize: 11,
    fontWeight: 400,
    color: "#8e8e8e",
  },
  button: {
    color: "#8e8e8e",
    background: "0 0",
    border: 0,
    cursor: "pointer",
    fontSize: 11,
    fontWeight: "bold",
    width: "auto",
    padding: 0,
    marginLeft: 5,
  },
  moreButton: {
    marginLeft: "auto",
    color: "#8e8e8e",
    cursor: "pointer",
  },
  divider: {
    borderBottom: "1px solid rgba(var(--f52,142,142,142),1)",
    display: "inline-block",
    height: 0,
    marginRight: 16,
    verticalAlign: "middle",
    width: 24,
  },
  showReplyButton: {
    color: "#8e8e8e",
    background: "0 0",
    border: 0,
    cursor: "pointer",
    fontSize: 11,
    fontWeight: "bold",
    width: "auto",
    padding: 0,
  },
  textField: {
    width: "100%",
    "& .MuiInput-underline input": {
      padding: 0,
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "&:hover .MuiInput-underline:before": {
      borderBottom: "none",
    },
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    borderRadius: 50,
    padding: "0 10px",
  },
  paper: {
    padding: "0 15px",
    borderRadius: "50px",
    width: "100%",
  },
  reply: {
    display: "flex",
    alignItems: "flex-start",
    padding: "0 15px",
    margin: "10px 0 10px 30px",
  },
  input: {
    fontSize: 13,
  },
}));
