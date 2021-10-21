import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { authenticationMe } from "./authentication-reducer";
import store from "./State";



let initialState = {
  posts: [
    { id: 3, message: "Message id", likesCount: 0, },
    { id: 33, message: "Message id 33", likesCount: 30, },
    { id: 1, message: "Message id 1", likesCount: 10, },
    { id: 40, message: "lkasdf lsdfakldfj", likesCount: 40, },
    { id: 1092, message: "Message id 1092", likesCount: 19800, },
  ] as Array<PostType>,
  newPostText: "",
  profile: null as null | ProfileType,
  status: "",
}

export type InitialState = typeof initialState;
const profileReducer = function (state = initialState, action: any): InitialState {
  // const profileReducer = function (state = store._state.profilePage, action) {
  switch (action.type) {
    case ADD_POST: {
      let newPost;
      if (action.post) newPost = action.post;
      else newPost = state.newPostText;
      let post: PostType = {
        id: "new post",
        message: newPost,
        likesCount: 0,
      }
      let stateCopy = { ...state };
      stateCopy.posts = [...state.posts];
      stateCopy.posts.push(post);
      stateCopy.newPostText = '';
      return stateCopy;
    }
    case UPDATE_NEW_POST_TEXT: {
      let stateCopy = { ...state };
      stateCopy.newPostText = action.text;
      return stateCopy;
    }
    case SET_USER_PROFILE: {
      let a = { ...state, profile: action.profile, };
      return a;
    }
    case SET_USER_STATUS: {
      return { ...state, status: action.status, };
    }
    case UPDATE_STATUS: {
      return { ...state, status: action.status, };
    }
    case DELETE_POST: {
      return { ...state, posts: state.posts.filter(p => p.id != action.postId) };
    }
    case SAVE_PHOTO: {
      return { ...state, profile: { ...state.profile, photos: action.photos, } as ProfileType }
    }

    default:
      return state;

  }
}

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";
const UPDATE_STATUS = "UPDATE-STATUS";
const DELETE_POST = "DELETE-POST";
const SAVE_PHOTO = "SAVE-PHOTO";

type AddPostCreateAction = { type: typeof ADD_POST, post: string, };
type UpdateNewPostTextCreateAction = { type: typeof UPDATE_NEW_POST_TEXT, text: string, };
type SetUserProfile = { type: typeof SET_USER_PROFILE, profile: ProfileType, };
type SetUserStatus = { type: typeof SET_USER_STATUS, status: string, };
type DeletePost = { type: typeof DELETE_POST, postId: number, };
type SavePhoto = { type: typeof SAVE_PHOTO, photos: PhotosType, };

export const addPostCreateAction = function (post: string): AddPostCreateAction { return { type: ADD_POST, post } };
export const updateNewPostTextCreateAction = function (text: string): UpdateNewPostTextCreateAction { return { type: UPDATE_NEW_POST_TEXT, text: text } };
export function setUserProfile(profile: ProfileType): SetUserProfile { return { type: SET_USER_PROFILE, profile, } };
export function setUserStatus(status: string): SetUserStatus { return { type: SET_USER_STATUS, status, } };
export function deletePost(postId: number): DeletePost { return { type: DELETE_POST, postId, } };
export function savePhoto(photos: PhotosType): SavePhoto { return { type: SAVE_PHOTO, photos } };
// export function updateStatus(status) { return { type: UPDATE_STATUS, status, }};

export function getUserProfile(userId: number) {
  return async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId);
    // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.state.userId}`)
    dispatch(setUserProfile(response.data));
  };
}

export function getUserStatus(userId: number) {
  return async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response.data));
  }
}

export function updateStatus(status: string) {
  return async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  }
}

export function sendPhoto(file: any) {
  return async (dispatch: any) => {
    let response = await profileAPI.sendPhoto(file);
    if (response.data.resultCode === 0) {
      dispatch(savePhoto(response.data.data.photos));
    }
  }
}

export function saveProfile(formData: ProfileType) {
  return async (dispatch: any, getState: any) => {
    let response = await profileAPI.saveProfile(formData);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(getState().auth.userId));
    } else {
      const error = response.data.messages?.length > 0 ? response.data.messages.join(" | ") : "some error response";
      dispatch(stopSubmit("profileEditForm", { contacts: { vk: "test vk global error", }, _error: error, }))
      return Promise.reject(error);
    }
  }
}


export default profileReducer;