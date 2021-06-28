import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Header from "../../components/Header";

import Post from "./components/Post";
import Suggestion from "./components/Suggestion";
import Upload from "./components/Upload";

import useStyles from "./styles/homeStyles";

import {
  AvatarService,
  PostService,
  UserService,
} from "../../services/services";
import PostSkeleton from "./components/PostSkeleton";

const Home = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [suggests, setSuggests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem("username");
      setLoading(true);
      await AvatarService.getUserAvatar(username).then((response) => {
        if (response.status === 200) {
          setAvatar(response.data.path);
        }
      });
      await UserService.getProfile(username, username).then((response) => {
        if (response.status === 200) {
          setDisplayName(response.data.displayName);
        }
      });
      await UserService.getSuggestion(username).then((response) => {
        if (response.status === 200) {
          setSuggests(response.data);
        }
      });
      await PostService.getPostUser(username).then((response) => {
        if (response.status === 200) {
          setPosts(response.data);
          setLoading(false);
        }
      });
    };

    fetchData();
  }, []);

  const handleClick = () => {
    const username = localStorage.getItem("username");
    const latestPostId = posts[posts.length - 1].id;

    PostService.getMorePost(username, latestPostId).then((response) => {
      if (response.status === 200) {
        response.data.length > 0
          ? setPosts(posts.concat(response.data))
          : alert("There are no more posts");
      }
    });
  };

  return (
    <div className={classes.root}>
      <Header isHome={true} />
      <div className={classes.content}>
        {loading ? null : (
          <Upload
            setPosts={setPosts}
            avatar={avatar}
            displayName={displayName}
          />
        )}
        {loading ? (
          <Grid
            container
            className={classes.container}
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <PostSkeleton />
            <PostSkeleton />
          </Grid>
        ) : (
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
                  <Post post={post} setPosts={setPosts} postIndex={index} />
                </Grid>
              ))}
            {posts.length > 0 && (
              <Button color="primary" onClick={handleClick}>
                More posts
              </Button>
            )}
          </Grid>
        )}
        {loading ? null : <Suggestion suggests={suggests} />}
      </div>
    </div>
  );
};

export default Home;
