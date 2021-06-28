import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {},
  tabContainer: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "auto",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    width: "60%",
    margin: "100px auto 0 auto",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: 220,
  },
  tabPanel: {
    width: "100%",
    padding: "30px 20px",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));
