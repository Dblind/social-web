import { UserType } from "../types/types";
import { GetItemsType, instance, ServerResponseType } from "./api";
import { profileAPI } from "./profile-api";

export const usersAPI = {
  getUsers: getUsers,
  follow: function (userId: number) {
    return instance.post<ServerResponseType>(`/follow/${userId}`)
      .then(response => response.data);
  },
  unFollow: unFollow,
  getProfile(userId: number) {
    console.log("** Obsoleted method! ** Please use the profileAPI.getProfile.")
    return profileAPI.getProfile(userId);
  },
}

function getUsers(currentPage: number, pageSize: number) {
  return instance.get<GetItemsType<UserType>>(
    `/users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data);
}

function follow(userId: number) {
  return instance.post<ServerResponseType>(`/follow/${userId}`)
    .then(response => response.data);
}

function unFollow(userId: number) {
  return instance.delete(`/follow/${userId}`).then(res => res.data) as Promise<ServerResponseType>;
  // .then(response => response.data);
}