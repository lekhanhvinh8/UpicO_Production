import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/";

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
