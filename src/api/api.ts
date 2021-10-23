import axios, { AxiosResponse } from "axios";

const baseURL = "https://social-network.samuraijs.com/api/1.0";

export enum responseCodes {
  success = 0,
  Error = 1,
}
export enum responseCodeForCaptcha {
  captchaIsRequired = 10,
}


export const getUsers_nativeVersion = (currentPage: number, pageSize: number) => {
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
  getProfile(userId: number) {
    console.log("** Obsoleted method! ** Please use the profileAPI.getProfile.")
    return profileAPI.getProfile(userId);
  },
}
function instancesTyping() {
  usersAPI.follow(5).then((res: AxiosResponse<string>) => res.data);
  instance.get<string>("/users").then(res => res.data.toLowerCase);
}

function getUsers(currentPage: number, pageSize: number) {
  return instance.get(
    `/users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data);
}

function follow(userId: number) {
  return instance.post(`/follow/${userId}`)
  // .then(response => response.data);
}

function unFollow(userId: number) {
  return instance.delete(`/follow/${userId}`)
  // .then(response => response.data);
}

// ***********************

export const profileAPI = {
  getProfile,
  getStatus,
  updateStatus,
  putPhoto,
  sendPhoto,
  saveProfile,
}

function getProfile(userId: number) {
  return instance.get(`/profile/${userId}`);
}

function getStatus(userId: number) {
  return instance.get(`/profile/status/${userId}`);
}

function updateStatus(status: string) {
  return instance.put(`/profile/status`, { status: status, });
}

function putPhoto(img: any) {
  return instance.put(`profile/status`, {
    small: "https://www.meme-arsenal.com/memes/ed71ac4efff3d04e446d619bb91107ff.jpg",
    large: "https://www.meme-arsenal.com/memes/ed71ac4efff3d04e446d619bb91107ff.jpg",
  })
}

function sendPhoto(file: any) {
  let formData = new FormData();
  formData.append("image", file);

  return instance.put(`/profile/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}

function saveProfile(formData: any) {
  return instance.put(`/profile`, formData);
}

// ***********************

export const securityAPI = {
  getCaptchaUrl,
}

function getCaptchaUrl() {
  return instance.get(`/security/get-captcha-url`);
}

// ***********************

type Me = {
  data: { id: number, login: string, email: string, },
  resultCode: responseCodes,
  messages: string[],
}
type Login = {
  data: { userId: number, },
  resultCode: responseCodes | responseCodeForCaptcha,
  messages: string[],
}

export const authentificationAPI = {
  me,
  login,
  logout,
}

function me() {
  return instance.get<Me>("/auth/me")
    .then(res => res.data);
}

function login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
  return instance.post<Login>("/auth/login", { email, password, rememberMe, captcha })
    .then(res => res.data);
}

function logout() {
  return instance.delete("/auth/login");
}