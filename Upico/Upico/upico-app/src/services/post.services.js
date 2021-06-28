import axios from "axios";

const API_URL = "http://localhost:5000/api/";

const createPost = (username, content) => {
  return axios
    .post(API_URL + "Posts", {
      userName: username,
      content: content,
    })
    .catch((error) => {
      return error.response;
    });
};

const getPostDetail = (username, postId) => {
  return axios
    .get(API_URL + "Posts?sourceUsername=" + username + "&postId=" + postId)
    .catch((error) => {
      return error.response;
    });
};

const uploadImage = (postID, formData) => {
  return axios.post(API_URL + "postedImages/" + postID, formData);
};

const getPostUser = (username) => {
  return axios
    .get(API_URL + "Posts/relatedPosts?username=" + username + "&numPosts=10")
    .catch((error) => {
      return error.response;
    });
};

const getMorePost = (username, latestPostId) => {
  return axios
    .get(
      API_URL +
        "Posts/moreRelatedPosts?username=" +
        username +
        "&latestPostId=" +
        latestPostId +
        "&numPosts=15"
    )
    .catch((error) => {
      return error.response;
    });
};

const getPostProfile = (sourceUsername, targetUsername, getImages) => {
  return axios
    .get(
      API_URL +
        "Posts/UserProfilePosts?sourceUsername=" +
        sourceUsername +
        "&targetUsername=" +
        targetUsername +
        "&numPosts=15" +
        "&getImages=" +
        getImages
    )
    .catch((error) => {
      return error.response;
    });
};

const getMorePostProfile = (
  sourceUsername,
  targetUsername,
  latestPostId,
  getImages
) => {
  return axios
    .get(
      API_URL +
        "Posts/MoreUserProfilePosts?sourceUsername=" +
        sourceUsername +
        "&targetUsername=" +
        targetUsername +
        "&latestPostId=" +
        latestPostId +
        "&numPosts=15" +
        "&getImages=" +
        getImages
    )
    .catch((error) => {
      return error.response;
    });
};

const setPrivate = (postId) => {
  return axios
    .put(API_URL + "Posts?postId=" + postId + "&privateMode=true")
    .catch((error) => {
      return error.response;
    });
};

const setPublic = (postId) => {
  return axios
    .put(API_URL + "Posts?postId=" + postId + "&privateMode=false")
    .catch((error) => {
      return error.response;
    });
};

const deletePostImage = (postId) => {
  return axios.delete(API_URL + "postedImages/" + postId).catch((error) => {
    return error.response;
  });
};

const deletePost = (postId) => {
  return axios.delete(API_URL + "Posts?postId=" + postId).catch((error) => {
    return error.response;
  });
};

const reportPost = (id, reporterUserName, reportContent) => {
  return axios
    .post(API_URL + "Posts/report", { id, reporterUserName, reportContent })
    .catch((error) => {
      return error.response;
    });
};

const PostService = {
  createPost,
  getPostDetail,
  uploadImage,
  getPostUser,
  getMorePost,
  getPostProfile,
  getMorePostProfile,
  setPrivate,
  setPublic,
  deletePostImage,
  deletePost,
  reportPost,
};

export default PostService;
