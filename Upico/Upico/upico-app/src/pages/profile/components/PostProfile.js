import { Grid } from "@material-ui/core";
import React from "react";

import useStyles from "./styles/postProfileStyles";

import { useProfile } from "../reducer/profileReducer";
import Post from "./Post";

const PostProfile = () => {
  const classes = useStyles();

  const { posts } = useProfile();
  console.log(posts);

  return (
    <Grid
      container
      className={classes.container}
      spacing={0}
      direction="column"
      justify="center"
      alignItems="center"
    >
      {posts.length > 0 &&
        posts.map((post, index) => (
          <Grid
            item
            style={{ padding: 0, marginBottom: 100, minWidth: 500 }}
            xs={12}
            sm={4}
            md={4}
            lg={4}
            key={post.id}
          >
            <Post post={post} />
          </Grid>
        ))}
    </Grid>
  );
};

export default PostProfile;
