import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  profile: {
    padding: "100px 40px 0 40px",
  },
  content: {
    width: "40%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 50,
  },
  uploadButton: {
    border: 0,
    padding: 0,
    cursor: "pointer",
    backgroundColor: "white",
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    "&[loading='1']": {
      opacity: 0.5,
    },
  },
  icon: {
    width: 20,
    height: "auto",
    color: "#888",
  },
  info: {
    flexGrow: 1,
  },
  infoPart: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  typo: {
    color: "inherit",
    marginRight: 20,
  },
  button: {
    textTransform: "inherit",
    padding: "3px 20px",
    backgroundColor: "#0095f6",
  },
  divider: {
    width: "58%",
    margin: "0 auto",
    height: 1,
    backgroundColor: "#d9d9d9",
  },
  gallery: {
    maxWidth: "60%",
    margin: "30px auto",
  },
  galleryItem: {
    position: "relative",
    cursor: "pointer",
    "&:hover img": {
      opacity: 0.6,
    },
    "&:hover $galleryItemInfo": {
      display: "block",
    },
  },
  galleryItemInfo: {
    display: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "#fff",
    transform: "translate(-50%, -50%)",
    "& ul, & li": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& li": {
      marginRight: 30,
    },
  },
  galleryItemType: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    color: "white",
  },
  galleryOverlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  galleryImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  buttonProgress: {
    position: "absolute",
    color: "#009688",
    top: "50%",
    left: "50%",
    marginLeft: -12,
    marginTop: -12,
  },
  avatarProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "#009688",
    marginLeft: -12,
    marginTop: -12,
  },
  loadMore: {
    width: "100%",
    display: "grid",
    placeItems: "center",
    marginBottom: 40,
  },
}));
