import { CircularProgress } from "@material-ui/core";
import React from "react";

import useStyles from "./styles/fullscreenLoadingStyles";

const FullscreenLoading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={40} className={classes.progress} />
    </div>
  );
};

export default FullscreenLoading;
