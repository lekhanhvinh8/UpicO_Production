import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/admin/";

const approveReport = (postId) => {
  return axios.delete(API_URL + "delete?postId=" + postId);
};

const rejectReport = (postId) => {
  return axios.delete(API_URL + "pass?postId=" + postId);
};

const AdminService = {
  approveReport,
  rejectReport,
};

export default AdminService;
