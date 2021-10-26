import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profile-api";
import { usersAPI } from "../api/users-api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { authenticationMe } from "./authentication-reducer";
import { BaseThunkType, InferActionTypes } from "./redux-store";
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
const profileReducer = function (state = initialState, action: ActionTypes): InitialState {
  // const profileReducer = function (state = store._state.profilePage, action) {
  switch (action.type) {
    case ADD_POST: {
      let newPost;
      if (action.post) newPost = action.post;
      else newPost = state.newPostText;
      let post: PostType = {
        id: 322,
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
    // case UPDATE_STATUS: {
    //   return { ...state, status: action.status, };
    // }
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

const ADD_POST = "sn/profile/ADD-POST";
const UPDATE_NEW_POST_TEXT = "sn/profile/UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "sn/profile/SET-USER-PROFILE";
const SET_USER_STATUS = "sn/profile/SET-USER-STATUS";
const UPDATE_STATUS = "sn/profile/UPDATE-STATUS";
const DELETE_POST = "sn/profile/DELETE-POST";
const SAVE_PHOTO = "sn/profile/SAVE-PHOTO";

type AddPostCreateAction = { type: typeof ADD_POST, post: string, };
type UpdateNewPostTextCreateAction = { type: typeof UPDATE_NEW_POST_TEXT, text: string, };
type SetUserProfile = { type: typeof SET_USER_PROFILE, profile: ProfileType, };
type SetUserStatus = { type: typeof SET_USER_STATUS, status: string, };
type DeletePost = { type: typeof DELETE_POST, postId: number, };
type SavePhoto = { type: typeof SAVE_PHOTO, photos: PhotosType, };

export const addPostCreateAction = function (post: string) { return { type: ADD_POST, post } as const };
export const updateNewPostTextCreateAction = function (text: string) { return { type: UPDATE_NEW_POST_TEXT, text: text } as const };
export function setUserProfile(profile: ProfileType) { return { type: SET_USER_PROFILE, profile, } as const };
export function setUserStatus(status: string) { return { type: SET_USER_STATUS, status, } as const };
export function deletePost(postId: number) { return { type: DELETE_POST, postId, } as const };
export function savePhoto(photos: PhotosType) { return { type: SAVE_PHOTO, photos } as const };
// export function updateStatus(status) { return { type: UPDATE_STATUS, status, }};


// thunks **********
const actions = {
  addPostCreateAction,
  updateNewPostTextCreateAction,
  setUserProfile,
  setUserStatus,
  deletePost,
  savePhoto,
}
export type ActionTypes = InferActionTypes<typeof actions>;
type ThunkTypes = BaseThunkType<ActionTypes | FormAction>;

export function getUserProfile(userId: number): ThunkTypes {
  return async (dispatch) => {
    let responseData = await usersAPI.getProfile(userId);
    // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.state.userId}`)
    dispatch(setUserProfile(responseData));
  };
}

export function getUserStatus(userId: number): ThunkTypes {
  return async (dispatch) => {
    let responseData = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(responseData));
  }
}

export function updateStatus(status: string): ThunkTypes {
  return async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  }
}

export function sendPhoto(file: File): ThunkTypes {
  return async (dispatch) => {
    let responseData = await profileAPI.sendPhoto(file);
    if (responseData.resultCode === 0) {
      dispatch(savePhoto(responseData.data.photos));
    }
  }
}

export function saveProfile(formData: ProfileType): ThunkTypes {
  return async (dispatch, getState) => {
    let responseData = await profileAPI.saveProfile(formData);
    if (responseData.resultCode === 0) {
      const userId = getState().auth.userId;
      if (userId != null) dispatch(getUserProfile(userId)); else throw new Error("redux value 'userId' can't be null.")
    } else {
      const error = responseData.messages?.length > 0 ? responseData.messages.join(" | ") : "some error response";
      dispatch(stopSubmit("profileEditForm", { contacts: { vk: "test vk global error", }, _error: error, }))
      return Promise.reject(error);
    }
  }
}


export default profileReducer;