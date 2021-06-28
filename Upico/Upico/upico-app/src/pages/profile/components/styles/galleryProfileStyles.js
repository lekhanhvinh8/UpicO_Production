import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  gallery: {},
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
  loadMore: {
    width: "100%",
    display: "grid",
    placeItems: "center",
    marginBottom: 40,
  },
}));
