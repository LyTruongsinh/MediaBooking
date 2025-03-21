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

const createNewUserService = (data) => {
  console.log("check", data);
  return axios.post('/api/create-new-user', data);
}
export { handleLoginApi, getAllUsers, createNewUserService };
