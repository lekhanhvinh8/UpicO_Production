import { Paper } from "@material-ui/core";

import React from "react";

import useStyles from "./styles/modalStyles";
import { useLoading } from "../../../hooks/hooks";

import FullScreenLoading from "../../../components/FullscreenLoading";

import CommentService from "../../../services/comment.services";

import { useDispatchProfile } from "../reducer/profileReducer";

const CommentModal = ({
  isShowing,
  modalRef,
  setShowingModal,
  auth,
  commentId,
  setComments,
  postId
}) => {
  const classes = useStyles();

  const { loading, onLoading, offLoading } = useLoading();

  isShowing && (document.body.style.overflow = "hidden");

  const { postsDispatch } = useDispatchProfile();

  const removeComment = () => {
    setShowingModal(false);
    onLoading();
    CommentService.deleteComment(commentId).then((response) => {
      if (response.status === 200) {
        postsDispatch({ type: "REMOVE_COMMENT", postId });
        setComments((prevComments) => {
          return prevComments.filter((comment) => comment.id !== commentId);
        });
        offLoading();
      }
      document.body.style.overflow = "auto";
    });
  };

  return isShowing ? (
    <div>
      {loading ? <FullScreenLoading /> : null}
      <div className={classes.modalOverlay}></div>
      <Paper className={classes.root} ref={modalRef}>
        {auth ? (
          <div
            className={classes.option}
            style={{ color: "#ed4956", borderRadius: 15 }}
            onClick={removeComment}
          >
            Remove
          </div>
        ) : (
          <div
            className={classes.option}
            style={{ color: "#ed4956", borderRadius: 15 }}
          >
            Report
          </div>
        )}
        <div
          className={classes.option}
          style={{ borderRadius: 0 }}
          onClick={() => {
            setShowingModal(false);
            document.body.style.overflow = "auto";
          }}
        >
          Cancel
        </div>
      </Paper>
    </div>
  ) : null;
};

export default CommentModal;
