import { Avatar, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

import { MoreHoriz } from "@material-ui/icons";

import useStyles from "./styles/commentStyles";

import TimeAgo from "react-timeago";

import { AvatarService, CommentService } from "../../../services/services";
import CommentModal from "./CommentModal";

const Comment = ({ comment, index, setComments }) => {
  const classes = useStyles();

  const modalRef = useRef(null);

  const [isReplying, setIsReplying] = useState(false);
  const [isShowingReply, setIsShowingReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const [text, setText] = useState(
    comment.replies > 0
      ? "Show " + comment.replies + " replies"
      : comment.replies === 0
      ? "Hide replies"
      : "Show replies"
  );
  const [avatar, setAvatar] = useState("");
  const [auth, setAuth] = useState(false);

  const [isShowing, setIsShowing] = useState(false);

  const username = localStorage.getItem("username");

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  const handleClick = () => {
    setIsReplying(!isReplying);
    AvatarService.getUserAvatar(username).then((response) => {
      response.status === 404 ? setAvatar(null) : setAvatar(response.data.path);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const username = localStorage.getItem("username");
      const content = e.target.value;
      const parentId = e.target.id;
      CommentService.replyComment(username, content, parentId).then(
        (response) => {
          if (response.status === 200) {
            comment.replies <= 3 ? setText("Hide replies") : setText("Show more replies")
            setReplies([...replies, response.data]);
            setComments((prevComments) => {
              return prevComments.map((comment) =>
                comment.id === parentId
                  ? { ...comment, replies: comment.replies + 1 }
                  : comment
              );
            });
            setIsReplying(false);
            setIsShowingReply(true);
          }
        }
      );
    }
  };

  const showReply = () => {
    if (replies.length < comment.replies && isShowingReply) {
      const latestReplyId = replies[0].id;
      CommentService.getMoreReply(comment.id, latestReplyId).then(
        (response) => {
          if (response.status === 200) {
            setReplies((prevReplies) => {
              return response.data.concat(prevReplies);
            });
            const remainReply =
              comment.replies - replies.length - response.data.length;
            remainReply > 0
              ? setText("Show more " + remainReply + " replies")
              : setText("Hide replies");
          }
        }
      );
    } else if (replies.length === comment.replies && isShowingReply) {
      setText("Show replies");
      setIsShowingReply(false);
    } else {
      setIsShowingReply(true);
      replies.length === comment.replies
        ? setText("Hide replies")
        : setText(
            "Show more " + (comment.replies - replies.length) + " replies"
          );
    }
  };

  const openMoreModal = (e) => {
    e.preventDefault();
    if (comment.username === username) {
      setAuth(true);
      toggle();
    } else {
      setAuth(false);
      toggle();
    }
  };

  useEffect(() => {
    if (comment.replies > 0 && replies.length === 0) {
      CommentService.getReply(comment.id).then((response) => {
        if (response.status === 200) {
          setReplies(response.data);
        }
      });
    }
  }, [comment, replies]);

  return (
    <div>
      <CommentModal
        isShowing={isShowing}
        toggleModal={toggle}
        modalRef={modalRef}
        auth={auth}
        commentId={auth ? comment.id : null}
        setComments={setComments}
        commentIndex={index}
      />
      <div className={classes.comment}>
        <Avatar
          alt="avatar"
          src={comment.userAvatarUrl ? comment.userAvatarUrl : avatar}
          className={classes.avatar}
          onClick={() => {
            window.location.href =
              window.location.origin + "/" + comment.username;
          }}
        />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div
            style={{ display: "flex", position: "relative", flexWrap: "wrap" }}
          >
            <a href={"/" + comment.username} className={classes.displayName}>
              {comment.userDisplayName}
            </a>
            <Typography
              varian="body1"
              style={{
                fontSize: 14,
                wordBreak: "break-word",
                maxWidth: "80%",
              }}
            >
              {comment.content}
            </Typography>
            <MoreHoriz className={classes.moreButton} onClick={openMoreModal} />
          </div>
          <div>
            <TimeAgo
              date={comment.dateCreate}
              className={classes.timeAgo}
              title={null}
              live={false}
            />
            <button className={classes.button} onClick={handleClick}>
              Reply
            </button>
          </div>
        </div>
      </div>
      {comment.replies > 0 && (
        <div className={classes.reply}>
          <button className={classes.showReplyButton} onClick={showReply}>
            <div className={classes.divider}></div>
            <span>{text}</span>
          </button>
        </div>
      )}
      {isShowingReply & (replies?.length > 0)
        ? replies?.map((reply) => {
            return (
              <div className={classes.reply} key={reply.id}>
                <Avatar
                  alt="avatar"
                  src={reply.userAvatarUrl ? reply.userAvatarUrl : avatar}
                  className={classes.avatar}
                  style={{ width: 25, height: 25 }}
                  onClick={() => {
                    window.location.href =
                      window.location.origin + "/" + reply.username;
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <a
                      href={"/" + reply.username}
                      className={classes.displayName}
                    >
                      {reply.userDisplayName}
                    </a>
                    <Typography
                      varian="body1"
                      style={{
                        fontSize: 14,
                        overflowWrap: "break-word",
                        maxWidth: "80%",
                      }}
                    >
                      {reply.content}
                    </Typography>
                  </div>
                  <TimeAgo
                    date={reply.dateCreate}
                    className={classes.timeAgo}
                    title={null}
                    live={false}
                  />
                </div>
              </div>
            );
          })
        : null}
      {isReplying ? (
        <div className={classes.reply} style={{ alignItems: "center" }}>
          <Avatar
            alt="avatar"
            src={avatar}
            className={classes.avatar}
            style={{ width: 25, height: 25 }}
          />
          <Paper className={classes.paper}>
            <TextField
              className={classes.textField}
              placeholder="Reply something..."
              multiline
              rows={1}
              rowsMax={3}
              onKeyDown={(e) => handleKeyDown(e, "id")}
              id={comment.id}
            />
          </Paper>
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
