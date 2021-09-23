import store from "./State";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export const addPostCreateAction = function () {
  return { type: ADD_POST, }
}

export const updateNewPostTextCreateAction = function (text) {
  return { type: UPDATE_NEW_POST_TEXT, text: text }
}


const profileReducer = function (state = store._state.profilePage, action) {
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
    default: console.log("Incorrect dispatch action type! type:\"" + action.type + "\".");
      break;

  }
  return state;
}

export default profileReducer;