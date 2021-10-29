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

function getUsers(currentPage: number, pageSize: number, term: string = "", friend: null | boolean = null) {
  let a = `/users?page=${currentPage}&count=${pageSize}&term=${term}`
  let b = friend ? `&friend=${friend}` : "";
  let c = a + b;
  // console.log("a", a);
  // console.log("b", b);
  // console.log("c", c);
  return instance.get<GetItemsType<UserType>>(c
    )
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