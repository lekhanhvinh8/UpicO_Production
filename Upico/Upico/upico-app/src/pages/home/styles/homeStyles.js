import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {},
  content: {
    padding: "100px 40px",
  },
  container: {
    padding: "5px 0",
  },
  uploadSkeleton: {
    width: "15%",
    height: 100,
    borderRadius: 10,
    position: "fixed",
  },
  suggestionSkeleton: {
    width: "15%",
    height: 100,
    position: "fixed",
    top: 100,
    right: 40,
    borderRadius: 10,
  },
}));
