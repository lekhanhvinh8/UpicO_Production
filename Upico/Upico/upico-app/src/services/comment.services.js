import axios from "axios";

const API_URL = "http://localhost:5000/api/Comments";

const getComment = (postId) => {
  return axios
    .get(API_URL + "/parents?postId=" + postId + "&numComments=5")
    .catch((error) => {
      return error.response;
    });
};

const getMoreComment = (postId, lastCommentId) => {
  return axios
    .get(
      API_URL +
        "/parents?postId=" +
        postId +
        "&lastCommentId=" +
        lastCommentId +
        "&numComments=4"
    )
    .catch((error) => {
      return error.response;
    });
};

const getReply = (parentId) => {
  return axios
    .get(API_URL + "/childrens?parentId=" + parentId + "&numComments=3")
    .catch((error) => {
      return error.response;
    });
};

const getMoreReply = (parentId, lastCommentId) => {
  return axios
    .get(
      API_URL +
        "/childrens?parentId=" +
        parentId +
        "&lastCommentId=" +
        lastCommentId +
        "&numComments=3"
    )
    .catch((error) => {
      return error.response;
    });
};

const comment = (username, content, postId) => {
  return axios
    .post(API_URL + "/comment", { username, content, postId })
    .catch((error) => {
      return error.response;
    });
};

const replyComment = (username, content, parentId) => {
  return axios
    .post(API_URL + "/reply", { username, content, parentId })
    .catch((error) => {
      return error.response;
    });
};

const deleteComment = (commentId) => {
  return axios.delete(API_URL + "?commentId=" + commentId).catch((error) => {
    return error.response;
  });
};

const CommentService = {
  getComment,
  getMoreComment,
  getReply,
  getMoreReply,
  comment,
  replyComment,
  deleteComment,
};

export default CommentService;
