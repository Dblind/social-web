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
  }


const profileReducer = function (state = initial, action) {
  // const profileReducer = function (state = store._state.profilePage, action) {
  switch (action.type) {
    /*
        case ADD_POST: {
          if (state.newPostText == "") break;
          let post = {};
          post.id = "new post";
          post.message = state.newPostText;
          state.posts.push(post);
          state.newPostText = "";
        }
          break;
        case UPDATE_NEW_POST_TEXT: {
          debugger;
          state.newPostText = action.text;
        }
          break;
        default: console.log("Incorrect dispatch action type! type:\"" + action.type + "\".");
          break;
    
        }
        return state; 
    */
    case ADD_POST: {
      if (state.newPostText == "") break;
      let post = {
        id: "new post",
        message: state.newPostText,
        likesCount: 0,
      }
      let stateCopy = {...state};
      stateCopy.posts = [...state.posts];
      stateCopy.posts.push(post);
      stateCopy.newPostText = '';
      return stateCopy;
    }
    case UPDATE_NEW_POST_TEXT: {
      let stateCopy = {...state};
      stateCopy.newPostText = action.text;
      return stateCopy;
    }
    case SET_USER_PROFILE: {
      let a = { ...state, profile: action.profile, };
      return a;
    }
    default: console.log("Incorrect dispatch action type! type:\"" + action.type + "\".");
      break;

  }
  return state;
}

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";

export const addPostCreateAction = function () { return { type: ADD_POST, } };
export const updateNewPostTextCreateAction = function (text) { return { type: UPDATE_NEW_POST_TEXT, text: text } };
export function setUserProfile(profile) { return {type: SET_USER_PROFILE, profile, } };



export default profileReducer;