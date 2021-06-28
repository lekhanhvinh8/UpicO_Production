import axios from "axios";

const API_URL = "http://localhost:5000/api/Likes";

const like = (username, postId) => {
  return axios
    .post(API_URL + "?username=" + username + "&postId=" + postId)
    .catch((error) => {
      return error.response;
    });
};

const dislike = (username, postId) => {
  return axios
    .delete(API_URL + "?username=" + username + "&postId=" + postId)
    .catch((error) => {
      return error.response;
    });
};

const LikeService = {
  like,
  dislike
};

export default LikeService;
