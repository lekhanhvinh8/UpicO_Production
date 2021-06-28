import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/Users";

const getUserInfo = (username) => {
  return axios.get(API_URL + "/" + username, { headers: authHeader() });
};

const searchUser = (key) => {
  return axios.get(API_URL + "?key=" + key).catch((error) => {
    return error.response;
  });
};

const getProfile = (sourceUsername, targetUsername) => {
  return axios
    .get(
      API_URL +
        "/profile?sourceUsername=" +
        sourceUsername +
        "&targetUsername=" +
        targetUsername
    )
    .catch((error) => {
      return error.response;
    });
};

const follow = (sourceUsername, targetUsername) => {
  return axios
    .get(
      API_URL +
        "/follow?sourceUsername=" +
        sourceUsername +
        "&targetUsername=" +
        targetUsername
    )
    .catch((error) => {
      return error.response;
    });
};

const unfollow = (sourceUsername, targetUsername) => {
  return axios
    .get(
      API_URL +
        "/unfollow?sourceUsername=" +
        sourceUsername +
        "&targetUsername=" +
        targetUsername
    )
    .catch((error) => {
      return error.response;
    });
};

const updateProfile = (
  userName,
  firstName,
  lastName,
  displayName,
  bio,
  phoneNumber
) => {
  return axios
    .put(API_URL + "/updateProfile", {
      userName,
      firstName,
      lastName,
      displayName,
      bio,
      phoneNumber,
    })
    .catch((error) => {
      return error.response;
    });
};

const changePassword = (
  userName,
  currentPassword,
  newPassword,
  newPasswordConfirm
) => {
  return axios
    .put(API_URL + "/changePassword", {
      userName,
      currentPassword,
      newPassword,
      newPasswordConfirm,
    })
    .catch((error) => {
      return error.response;
    });
};

const getSuggestion = (username) => {
  return axios
    .get(
      API_URL + "/followingSuggestion?username=" + username + "&numFollowings=5"
    )
    .catch((error) => {
      return error.response;
    });
};

const UserService = {
  getUserInfo,
  searchUser,
  getProfile,
  follow,
  unfollow,
  updateProfile,
  changePassword,
  getSuggestion,
};

export default UserService;
