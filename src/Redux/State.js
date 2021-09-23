// import { rerender } from "../index";

import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: "3", message: "Message id" },
        { id: "33", },
        { id: "1", },
        { id: "40", message: "lkasdf lsdfakldfj" },
        { id: "1092", },],
      newPostText: "",
      profile: 1,
    },
    dialogsPage: {
      collectionUsers: [
        { name: "Arny", id: 1, },
        { name: "Gans", id: 4, },
        { name: "Garry", id: 9, },
        { name: "Andrey", id: 1, },
        { name: "Sasha", id: 2, },
        { name: "John", id: 3, },
        { name: "Valera", id: 4, },
        { name: "Anna", id: 5, },],
      collectionMessages: [
        { message: "Hello" },
        { message: "Good day now." },
        { message: "Will come to the park." },
        { message: "Hello" },],
      newMessageBody: "",
    },
    friends: [
      { name: "Garry", pathImgAvatar: "./avatar.png", },
      { name: "Sasha", pathImgAvatar: "./avatar.png", },
      { name: "Gans", pathImgAvatar: "./avatar.png", },
    ]
  },

  addPost() {
    let post = {};
    post.id = "new post";
    post.message = this._state.profilePage.newPostText;
    this._state.profilePage.posts.push(post);
    this._state.profilePage.newPostText = this._state.profilePage.defaultNewPostText;
    rerender();
  },
  updateNewPostText(text) {
    this._state.profilePage.newPostText = text;
    rerender();
  },

  dispatch(action) {    // action: { type: "ADD-POST" }
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    rerender();

    // switch (action.type) {
    //   case this.dispatchConstantsAction.addPost: {
    //     let post = {};
    //     post.id = "new post";
    //     post.message = this._state.profilePage.newPostText;
    //     this._state.profilePage.posts.push(post);
    //     this._state.profilePage.newPostText = this._state.profilePage.defaultNewPostText;
    //     rerender();
    //   }
    //     break;
    //   case this.dispatchConstantsAction.updateNewPostText: {
    //     this._state.profilePage.newPostText = action.text;
    //     rerender();
    //   }
    //     break;
    //   case this.dispatchConstantsAction.updateNewMessageBody:
    //     this._state.dialogsPage.newMessageBody = action.text;
    //     rerender();
    //     break;
    //   case this.dispatchConstantsAction.sendMessage:
    //     this._state.dialogsPage.collectionMessages.push({
    //       message: this._state.dialogsPage.newMessageBody,
    //     });
    //     this._state.dialogsPage.newMessageBody = "";
    //     rerender();
    //     break;
    //   default: console.log("Incorrect dispatch action type! type:\"" + action.type + "\".");
    //     break;
    // }
  },

  getState() { return this._state; },
}


function rerender() { };
function setRerender(func) { if (typeof (func) == "function") rerender = func; }


export default store;
export { setRerender };