import { Paper, Snackbar } from "@material-ui/core";

import { Public, Group, CheckCircle } from "@material-ui/icons";

import React, { useEffect, useRef, useState } from "react";

import useStyles from "./styles/modalStyles";

import ReactDOM from "react-dom";
import { PostService } from "../../../services/services";
import { Alert } from "@material-ui/lab";

const PostModal = ({
  isShowing,
  toggleModal,
  postId,
  auth,
  privateMode,
  setPosts,
  postIndex,
  onLoading,
  offLoading,
}) => {
  const classes = useStyles();

  const reportOption = [
    "Nudity",
    "Violence",
    "Harassment",
    "Suicide or Self-injury",
    "False information",
    "Spam",
    "Unauthorized Sales",
    "Hate speech",
    "Terrorism",
    "Gross content",
    "Child Abuse",
  ];

  const modalRef = useRef(null);
  const [isReporting, setIsReporting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const username = localStorage.getItem("username");

  const showReportOption = () => {
    setIsReporting(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setSuccess(false);
  };

  const reportPost = (e, content) => {
    onLoading();
    toggleModal();
    PostService.reportPost(postId, username, content).then((response) => {
      if (response.status === 200) {
        setSuccess(true);
        offLoading();
      }
      if (response.status === 400) {
        setError(true);
        offLoading();
      }
      document.body.style.overflow = "auto";
    });
  };

  const setPrivate = () => {
    onLoading();
    toggleModal();
    PostService.setPrivate(postId).then((response) => {
      if (response.status === 200) {
        setPosts((prevPosts) => {
          let posts = [...prevPosts];
          let post = posts[postIndex];
          post.privateMode = true;
          posts[postIndex] = post;
          return posts;
        });
        offLoading();
      }
      document.body.style.overflow = "auto";
    });
  };

  const setPublic = () => {
    onLoading();
    toggleModal();
    PostService.setPublic(postId).then((response) => {
      if (response.status === 200) {
        setPosts((prevPosts) => {
          let posts = [...prevPosts];
          let post = posts[postIndex];
          post.privateMode = false;
          posts[postIndex] = post;
          return posts;
        });
        offLoading();
      }
      document.body.style.overflow = "auto";
    });
  };

  const removePost = () => {
    onLoading();
    toggleModal();
    PostService.deletePostImage(postId).then((response) => {
      if (response.status === 200) {
        PostService.deletePost(postId).then((response) => {
          if (response.status === 200) {
            setPosts((prevPosts) => {
              let posts = [...prevPosts];
              posts.splice(postIndex, 1);
              return posts;
            });
            offLoading();
          }
        });
      }
      document.body.style.overflow = "auto";
    });
  };

  isShowing && (document.body.style.overflow = "hidden");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal();
        setIsReporting(false);
        document.body.style.overflow = "auto";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, toggleModal]);

  return isShowing ? (
    ReactDOM.createPortal(
      <div>
        <div className={classes.modalOverlay}></div>
        <Paper className={classes.root} ref={modalRef}>
          {auth ? (
            <div style={{ width: "100%" }}>
              <div
                className={classes.option}
                style={{ color: "#0095f6", borderRadius: 15 }}
                onClick={setPrivate}
              >
                <div style={{ flex: "1 0 0px", textAlign: "right" }}>
                  <Group className={classes.icon} />
                </div>
                <div className={classes.iconContainer}>
                  Private
                  {privateMode && <CheckCircle className={classes.checkIcon} />}
                </div>
              </div>
              <div
                className={classes.option}
                style={{ color: "#0095f6" }}
                onClick={setPublic}
              >
                <div style={{ flex: "1 0 0px", textAlign: "right" }}>
                  <Public className={classes.icon} />
                </div>
                <div className={classes.iconContainer}>
                  Public
                  {!privateMode && (
                    <CheckCircle className={classes.checkIcon} />
                  )}
                </div>
              </div>
              <div
                className={classes.option}
                style={{ color: "#ed4956" }}
                onClick={removePost}
              >
                Remove
              </div>
            </div>
          ) : !isReporting ? (
            <div
              className={classes.option}
              style={{ color: "#ed4956", borderRadius: 15 }}
              onClick={showReportOption}
            >
              Report
            </div>
          ) : (
            <div className={classes.option} style={{ borderRadius: 15 }}>
              Please select a problem
            </div>
          )}
          {isReporting
            ? reportOption.map((content) => {
                return (
                  <div
                    className={classes.option}
                    style={{ borderRadius: 15, fontWeight: 400 }}
                    onClick={(e) => reportPost(e, content)}
                    key={content}
                  >
                    {content}
                  </div>
                );
              })
            : null}
          <div
            className={classes.option}
            onClick={() => {
              setIsReporting(false);
              toggleModal();
              document.body.style.overflow = "auto";
            }}
          >
            Cancel
          </div>
        </Paper>
      </div>,
      document.body
    )
  ) : (
    <div>
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Success! We will inspect your report!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          You already have reported this post!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PostModal;
