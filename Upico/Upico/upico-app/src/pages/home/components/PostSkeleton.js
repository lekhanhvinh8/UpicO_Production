import { Avatar, Grid, Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

import useStyles from "./styles/postSkeletonStyles";

const PostSkeleton = () => {
  const classes = useStyles();
  return (
    <Grid
      item
      style={{ padding: 0, marginBottom: 100, minWidth: 500 }}
      xs={12}
      sm={4}
      md={4}
      lg={4}
    >
      <Paper className={classes.root}>
        <div className={classes.avatarContainer}>
          <Skeleton variant="circle" width={27} height={27}>
            <Avatar />
          </Skeleton>
          <div style={{ width: "100%", marginLeft: 10 }}>
            <Skeleton animation="wave" height={15} width="60%"></Skeleton>
            <Skeleton animation="wave" height={15} width="40%"></Skeleton>
          </div>
        </div>
        <Skeleton animation="wave" height={300} variant="rect"></Skeleton>
        <div style={{ width: "100%", marginTop: 20, padding: 10 }}>
          <Skeleton animation="wave" height={15} width="60%"></Skeleton>
          <Skeleton animation="wave" height={15} width="40%"></Skeleton>
        </div>
      </Paper>
    </Grid>
  );
};

export default PostSkeleton;
