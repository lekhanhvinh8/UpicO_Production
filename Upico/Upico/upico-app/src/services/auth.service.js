import axios from "axios";

const API_URL = "http://localhost:5000/api/Users";

const register = (username, password, email, firstname, lastname, fullname) => {
  return axios
    .post(API_URL, {
      username,
      password,
      email,
      firstname,
      lastname,
      fullname,
    })
    .catch((error) => {
      return error.response;
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/authenticate", {
      username,
      password,
    })
    .catch((error) => {
      return error.response;
    });
};

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("data");
};

const getCurrentUser = () => {
  return localStorage.getItem("username");
};

const AuthService = {
  register,
  login,
  isLoggedIn,
  logout,
  getCurrentUser,
};

export default AuthService;
