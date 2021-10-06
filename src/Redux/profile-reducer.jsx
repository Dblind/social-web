import { profileAPI, usersAPI } from "../api/api";
import { authenticationMe } from "./authentication-reducer";
import store from "./State";

let initial = {
  posts: [
    { id: "3", message: "Message id" },
    { id: "33", },
    { id: "1", },
    { id: "40", message: "lkasdf lsdfakldfj" },
    { id: "1092", },],
  newPostText: "",
  profile: null,
  status: "",
}


const profileReducer = function (state = initial, action) {
  // const profileReducer = function (state = store._state.profilePage, action) {
  switch (action.type) {
    case ADD_POST: {
      let newPost;
      if (action.post) newPost = action.post;
      else newPost = state.newPostText;
      let post = {
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
      return { ...state, profile: { ...state.profile, photos: action.photos, } }
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

export const addPostCreateAction = function (post) { return { type: ADD_POST, post } };
export const updateNewPostTextCreateAction = function (text) { return { type: UPDATE_NEW_POST_TEXT, text: text } };
export function setUserProfile(profile) { return { type: SET_USER_PROFILE, profile, } };
export function setUserStatus(status) { return { type: SET_USER_STATUS, status, } };
export function deletePost(postId) { return { type: DELETE_POST, postId, } };
export function savePhoto(photos) { return { type: SAVE_PHOTO, photos } };
// export function updateStatus(status) { return { type: UPDATE_STATUS, status, }};

export function getUserProfile(userId) {
  return async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.state.userId}`)
    dispatch(setUserProfile(response.data));
  };
}

export function getUserStatus(userId) {
  return async dispatch => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response.data));
  }
}

export function updateStatus(status) {
  return async dispatch => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  }
}

export function sendPhoto(file) {
  return async dispatch => {
    let response = await profileAPI.sendPhoto(file);
    if (response.data.resultCode === 0) {
      dispatch(savePhoto(response.data.data.photos));
    }
  }
}


export default profileReducer;