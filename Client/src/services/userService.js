import axios from "../axios";
const handleLoginApi = async (useremail, userpassword) => {
  return axios.post("/api/login", {
    email: useremail,
    password: userpassword,
  });
};
const getAllUsers = async (inputid) => {
  return axios.get(`/api/get-all-users?id=${inputid}`);
};
export { handleLoginApi, getAllUsers };
