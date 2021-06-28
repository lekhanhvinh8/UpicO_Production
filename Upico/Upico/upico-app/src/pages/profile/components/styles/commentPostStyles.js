import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  avatar: {
    width: 27,
    height: 27,
    marginRight: 10,
    cursor: "pointer",
  },
  comment: {
    display: "flex",
    padding: "0 15px",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 10,
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
    },
  },
  timeAgo: {
    color: "#8e8e8e",
    fontSize: 12,
    fontWeight: "400",
    marginRight: 5,
  },
  button: {
    color: "#8e8e8e",
    background: "0 0",
    border: 0,
    cursor: "pointer",
    fontSize: 12,
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
    fontSize: 12,
    fontWeight: "bold",
    width: "auto",
    padding: 0,
  },
  textField: {
    marginTop: 5,
    width: "100%",
    padding: 0,
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
  },
  paper: {
    padding: "2px 15px",
    borderRadius: "50px",
    width: "100%",
  },
  reply: {
    display: "flex",
    alignItems: "flex-start",
    padding: "0 15px",
    margin: "10px 0 10px 35px",
  },
}));
