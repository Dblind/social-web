import axios from "axios";

const baseURL = "https://social-network.samuraijs.com/api/1.0";


export const getUsers_nativeVersion = (currentPage, pageSize) => {
  return axios.get(
    // `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPageNumb}&count=${this.props.pageSize}`)
    `${baseURL}/users?page=${currentPage}&count=${pageSize}`,
    { withCredentials: true, })
    .then(response => response.data);
}



// instance - axios.create()
// additional parameters for axios.get()

const instance = axios.create({
  withCredentials: true,
  baseURL: baseURL,
  headers: { "API-KEY": "d0d8fea3-e35d-4a5d-8b18-bc86cf9e55b5" },
});

export const usersAPI = {
  getUsers: getUsers,
  follow: follow,
  unFollow: unFollow,
  getProfile,
}

function getUsers(currentPage, pageSize) {
  return instance.get(
    `/users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data);
}

function follow(userId) {
  return instance.post(`/follow/${userId}`)
    .then(response => response.data);
}

function unFollow(userId) {
  return instance.delete(`/follow/${userId}`)
    // .then(response => response.data);
}

function getProfile(userId) {
  return instance.get(`/profile/${userId}`)
}

// ***********************

export const authentificationAPI = {
  me,
}

function me() {
  return instance.get("/auth/me");
}