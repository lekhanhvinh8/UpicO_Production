import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 99,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    opacity: 0.5,
  },
  root: {
    position: "fixed",
    top: "50vh",
    left: "50%",
    width: "65vw",
    zIndex: 100,
    transform: "translate(-50%, -50%)",
  },
  postContainer: {},
  postImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
    padding: "20px 15px",
    borderBottom: "1px solid #d9d9d9",
  },
  postAvatar: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 13,
    marginRight: 10,
  },
  postComment: {
    padding: "20px 15px",
    flexGrow: 1,
    overflowY: "scroll",
    height: 1,
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  comment: {
    display: "flex",
    alignItems: "flex-start",
  },
  commentSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 20,
  },
  commentInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
  },
  commentDate: {
    fontSize: 11,
    fontWeight: 400,
    color: "#8e8e8e",
  },
  postInteractSection: {
    borderTop: "1px solid #d9d9d9",
    padding: "5px 15px",
  },
  interact: {
    marginLeft: -3,
  },
  likeText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postCommentSection: {
    borderTop: "1px solid #d9d9d9",
    flexGrow: 0,
    padding: "5px 15px",
    display: "flex",
    alignItems: "center",
  },
  textField: {
    width: "100%",
    padding: "5px 0",
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
  input: {
    padding: 0,
    fontSize: 13,
  },
  icon: {
    color: "#009688",
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
    cursor: "pointer",
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
  button: {
    display: "flex",
    alignItems: "center",
    marginRight: 10,
  },
  closeIcon: {
    position: "fixed",
    right: 10,
    top: 10,
    zIndex: 100,
    width: 30,
    height: 30,
    color: "white",
    cursor: "pointer",
  },
  more: {
    width: "100%",
    display: "grid",
    placeItems: "center",
    marginTop: 20,
    cursor: "pointer",
  },
  moreIcon: {
    marginLeft: "auto",
    cursor: "pointer",
    color: "#8e8e8e",
  },
}));
