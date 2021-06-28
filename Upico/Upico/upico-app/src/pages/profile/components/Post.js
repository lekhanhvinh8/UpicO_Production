import { Avatar, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  Send,
  MoreHoriz,
} from "@material-ui/icons";

import useStyles from "./styles/postStyles";
import { useModal, useLoading } from "../../../hooks/hooks";

import {
  CommentService,
  LikeService,
  PostService,
} from "../../../services/services";

import PostModal from "./PostModal";
import CommentPost from "./CommentPost";
import FullscreenLoading from "../../../components/FullscreenLoading";

import { useDispatchProfile } from "../reducer/profileReducer";

const Post = ({ post }) => {
  const classes = useStyles();

  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [postDetail, setPostDetail] = useState({});

  const postId = post.id;
  const username = localStorage.getItem("username");

  const { isShowing, toggle } = useModal();
  const { loading, onLoading, offLoading } = useLoading();

  const { postsDispatch } = useDispatchProfile();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleLike = () => {
    LikeService.like(username, postId).then((response) => {
      if (response.status === 400) {
        LikeService.dislike(username, postId).then((response) => {
          setLikes(likes - 1);
          setIsLiked(false);
        });
      } else {
        setLikes(likes + 1);
        setIsLiked(true);
      }
    });
  };

  const handleComment = () => {
    if (comment === "") return;

    onLoading();
    CommentService.comment(username, comment, postId).then((response) => {
      if (response.status === 200) {
        setComments((prevComments) => [response.data, ...prevComments]);
        postsDispatch({ type: "ADD_COMMENT", postId });
        offLoading();
      }
    });
    setComment("");
  };

  const showMore = () => {
    const lastCommentId = comments[comments.length - 1].id;
    CommentService.getMoreComment(postId, lastCommentId).then((response) => {
      if (response.status === 200) {
        setComments((prevComments) => {
          return prevComments.concat(response.data);
        });
      }
    });
  };

  useEffect(() => {
    if (comments.length === 0 && post.comments > 0) {
      CommentService.getComment(postId).then((response) => {
        if (response.status === 200) {
          setComments(response.data);
        }
      });
    }
    if (Object.keys(postDetail).length === 0) {
      PostService.getPostDetail(username, postId).then((response) => {
        if (response.status === 200) {
          setPostDetail(response.data);
        }
      });
    }
  }, [postId, comments, post, postDetail, username]);

  return (
    <Paper className={classes.root}>
      <PostModal
        isShowing={isShowing}
        toggleModal={toggle}
        postId={post.id}
        auth={postDetail.username === username}
        privateMode={postDetail.privateMode}
        onLoading={onLoading}
        offLoading={offLoading}
        setPostDetail={setPostDetail}
      />
      {loading ? <FullscreenLoading /> : null}
      <div className={classes.avatarContainer}>
        <Avatar
          alt="avatar"
          src={postDetail.avatarUrl ? postDetail.avatarUrl : null}
          className={classes.avatar}
          onClick={() => {
            window.location.href =
              window.location.origin + "/" + postDetail.username;
          }}
        />
        <a
          href={"/" + postDetail.username}
          style={{ textDecoration: "none" }}
          className={classes.name}
        >
          {postDetail.displayName}
        </a>
        <MoreHoriz className={classes.moreButton} onClick={toggle} />
      </div>
      <div className={classes.content}>
        <Typography variant="body1" className={classes.text}>
          {post.content}
        </Typography>
      </div>
      <div className={classes.likeComment}>
        <div className={classes.button}>
          {isLiked ? (
            <Favorite
              className={classes.icon}
              style={{ cursor: "pointer" }}
              onClick={handleLike}
            />
          ) : (
            <FavoriteBorder
              className={classes.icon}
              style={{ cursor: "pointer" }}
              onClick={handleLike}
            />
          )}
          <Typography style={{ color: "#2a3f54", fontWeight: "bold" }}>
            {likes === 0
              ? likes
              : likes > 1
              ? likes + " likes"
              : likes + " like"}
          </Typography>
        </div>
        <div className={classes.button} style={{ cursor: "pointer" }}>
          <ChatBubbleOutline className={classes.icon} />
          <Typography style={{ color: "#2a3f54", fontWeight: "bold" }}>
            {post.comments === 0
              ? post.comments
              : post.comments > 1
              ? post.comments + " comments"
              : post.comments + " comment"}
          </Typography>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        {comments.length > 0 &&
          comments.map((comment, index) => {
            return (
              <CommentPost
                comment={comment}
                setComments={setComments}
                index={index}
                key={index}
                postId={post.id}
              />
            );
          })}
        {comments.length < post.comments && (
          <div className={classes.showMore}>
            <button className={classes.showMoreButton} onClick={showMore}>
              <span>Show more comments</span>
            </button>
          </div>
        )}
      </div>
      <div className={classes.comment}>
        <TextField
          className={classes.textField}
          placeholder="Write a comment..."
          multiline
          rows={2}
          rowsMax={4}
          onChange={handleChange}
          value={comment}
        />
        <div className={classes.commentButton} onClick={handleComment}>
          <Send className={classes.icon} />
        </div>
      </div>
    </Paper>
  );
};

export default Post;
