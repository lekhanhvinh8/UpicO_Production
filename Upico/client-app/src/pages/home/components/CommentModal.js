import { Paper } from "@material-ui/core";

import React, { useEffect } from "react";

import useStyles from "./styles/modalStyles";
import { useLoading } from "../../../hooks/hooks";

import FullScreenLoading from "../../../components/FullscreenLoading";

import ReactDOM from "react-dom";
import CommentService from "../../../services/comment.services";

const CommentModal = ({
  isShowing,
  modalRef,
  toggleModal,
  auth,
  commentId,
  setComments,
  commentIndex,
}) => {
  const classes = useStyles();

  const { loading, onLoading, offLoading } = useLoading();

  isShowing && (document.body.style.overflow = "hidden");

  const removeComment = () => {
    toggleModal();
    onLoading();
    CommentService.deleteComment(commentId).then((response) => {
      if (response.status === 200) {
        setComments((prevComments) => {
          let array = [...prevComments];
          array.splice(commentIndex, 1);
          return array;
        });
        offLoading();
      }
      document.body.style.overflow = "auto";
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal();
        document.body.style.overflow = "auto";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, toggleModal]);

  return isShowing
    ? ReactDOM.createPortal(
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
    : null;
};

export default CommentModal;
