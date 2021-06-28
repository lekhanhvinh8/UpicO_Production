import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  post_id: {
    display: "inline-block",
    marginRight: 30,
  },
  content: {
    display: "inline-block",
    marginRight: 30,
  },
  date_created: {
    display: "inline-block",
  },
  gallery: {
    margin: "20px 0",
  },
  galleryItem: {
    position: "relative",
    cursor: "pointer",
  },
  galleryImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  table: {
    "& .MuiFormControl-root": {
      width: "100%",
    },
  },
}));
