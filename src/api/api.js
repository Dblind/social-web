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
  getProfile(userId) {
    console.log("** Obsoleted method! ** Please use the profileAPI.getProfile.")
    return profileAPI.getProfile(userId);
  },
}

function getUsers(currentPage, pageSize) {
  return instance.get(
    `/users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data);
}

function follow(userId) {
  return instance.post(`/follow/${userId}`)
    // .then(response => response.data);
}

function unFollow(userId) {
  return instance.delete(`/follow/${userId}`)
  // .then(response => response.data);
}

// ***********************

export const profileAPI = {
  getProfile,
  getStatus,
  updateStatus,
  putPhoto,
}

function getProfile(userId) {
  return instance.get(`/profile/${userId}`);
}

function getStatus(userId) {
  return instance.get(`/profile/status/${userId}`);
}

function updateStatus(status) {
  return instance.put(`/profile/status`, { status: status, });
}

function putPhoto(img) {
  return instance.put(`profile/status`, {
    small: "https://www.meme-arsenal.com/memes/ed71ac4efff3d04e446d619bb91107ff.jpg",
    large: "https://www.meme-arsenal.com/memes/ed71ac4efff3d04e446d619bb91107ff.jpg",
  })
}

// ***********************

export const authentificationAPI = {
  me,
  login,
  logout,
}

function me() {
  return instance.get("/auth/me");
}

function login(email, password, rememberMe = false) {
  return instance.post("/auth/login", {email, password, rememberMe});
}

function logout() {
  return instance.delete("/auth/login");
}