import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {},
  avatarContainer: {
    backgroundColor: "#2a3f54",
    padding: 10,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: 27,
    height: 27,
    marginRight: 10,
    cursor: "pointer",
  },
  name: {
    fontSize: 12,
    color: "#009688",
    fontWeight: "bold",
  },
  content: {
    padding: "10px 15px",
  },
  text: {
    fontSize: 14,
  },
  image: {
    width: "100%",
    objectFit: "cover",
  },
  likeComment: {
    padding: "5px 15px",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  button: {
    display: "flex",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
    color: "#009688",
  },
  comment: {
    padding: "0 15px",
    borderTop: "1px solid #cecece",
    marginTop: 10,
    display: "flex",
    alignItems: "center",
  },
  textField: {
    marginTop: 5,
    width: "100%",
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
  commentButton: {
    cursor: "pointer",
  },
  slideIcon: {
    position: "absolute",
    top: "50%",
    padding: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    color: "white",
    border: "none",
    borderRadius: "50%",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  dot: {
    padding: 5,
    backgroundColor: "#bbb",
    borderRadius: "50%",
    marginLeft: 4,
    "&[active='1']": {
      backgroundColor: "#009688",
    },
  },
  moreButton: {
    cursor: "pointer",
    marginLeft: "auto",
    color: "#009688",
  },
  showMore: {
    padding: "0 15px",
  },
  showMoreButton: {
    color: "#8e8e8e",
    background: "0 0",
    border: 0,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "bold",
    width: "auto",
    padding: 0,
  },
}));
