import React from "react";

import useStyles from "./styles/bottomNotificationStyles";

const BottomNotification = ({ error }) => {
  const classes = useStyles();

  let valid = true;

  if (error !== "") {
    valid = false;
    document.body.style.overflow = "hidden";
  }

  return (
    <div className={classes.root} active={!valid ? 1 : 0}>
      {error}
    </div>
  );
};

export default BottomNotification;
