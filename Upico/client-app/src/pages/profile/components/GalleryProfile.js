import React, { useEffect, useRef, useState } from "react";

import useStyles from "./styles/galleryProfileStyles";

import { PostService } from "../../../services/services";

import { Button, Grid } from "@material-ui/core";

import { Favorite, ModeComment, PhotoLibrary } from "@material-ui/icons";
import PostDetailModal from "../components/PostDetailModal";

import { useProfile, useDispatchProfile } from "../reducer/profileReducer";
import { useModal } from "../../../hooks/hooks";

const GalleryProfile = () => {
  const classes = useStyles();

  const postModalRef = useRef(null);
  const statusModalRef = useRef(null);
  const commentModalRef = useRef(null);

  const { gallery, targetUsername } = useProfile();
  const { galleryDispatch } = useDispatchProfile();

  const [postId, setPostId] = useState("");
  const [statusShowing, setStatusShowing] = useState(false);
  const [commentShowing, setCommentShowing] = useState(false);

  const { isShowing, toggle } = useModal();

  const sourceUsername = localStorage.getItem("username");

  const showPostDetail = (postId) => {
    toggle();
    setPostId(postId);
  };

  const loadMorePost = () => {
    const latestPostId = gallery[gallery.length - 1].id;
    PostService.getMorePostProfile(
      sourceUsername,
      targetUsername,
      latestPostId
    ).then((response) => {
      if (response.status === 200) {
        if (response.data.length > 0) {
          const morePosts = response.data;
          galleryDispatch({ type: "LOAD_MORE_POST", morePosts });
        } else {
          alert("There are no more posts");
        }
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        postModalRef.current &&
        !postModalRef.current.contains(event.target)
      ) {
        toggle();
        setStatusShowing(false);
        setCommentShowing(false);
        document.body.style.overflow = "auto";
      }
      if (
        statusModalRef.current &&
        !statusModalRef.current.contains(event.target)
      ) {
        setStatusShowing(false);
        document.body.style.overflow = "auto";
      }

      if (
        commentModalRef.current &&
        !commentModalRef.current.contains(event.target)
      ) {
        setCommentShowing(false);
        document.body.style.overflow = "auto";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [postModalRef, toggle]);

  return (
    <div className={classes.root}>
      <PostDetailModal
        isShowing={isShowing}
        modalRef={postModalRef}
        postId={postId}
        statusModalRef={statusModalRef}
        statusShowing={statusShowing}
        setStatusShowing={setStatusShowing}
        commentShowing={commentShowing}
        setCommentShowing={setCommentShowing}
        commentModalRef={commentModalRef}
        togglePostDetail={toggle}
      />
      <Grid container className={classes.gallery} spacing={3}>
        {gallery.length > 0
          ? gallery.map((post) => (
              <Grid
                item
                xs={12}
                md={4}
                sm={6}
                lg={4}
                className={classes.galleryItem}
                key={post.id}
                onClick={() => showPostDetail(post.id)}
              >
                <div className={classes.galleryOverlay}>
                  <img
                    alt="postImage"
                    className={classes.galleryImage}
                    src={post.postImages[0].url}
                  ></img>
                </div>
                {post.postImages.length > 1 ? (
                  <div className={classes.galleryItemType}>
                    <PhotoLibrary />
                  </div>
                ) : null}
                <div className={classes.galleryItemInfo}>
                  <ul>
                    <li>
                      <Favorite style={{ marginRight: 5 }} />
                      {post.likes}
                    </li>
                    <li>
                      <ModeComment style={{ marginRight: 5 }} />
                      {post.comments}
                    </li>
                  </ul>
                </div>
              </Grid>
            ))
          : null}
      </Grid>
      {gallery.length >= 15 && (
        <div className={classes.loadMore}>
          <Button color="primary" onClick={loadMorePost}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default GalleryProfile;
