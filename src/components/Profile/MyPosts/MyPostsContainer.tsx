import React from "react";
import { updateNewMessageBodyCreateAction } from "../../../Redux/dialogs-reducer";
import { updateNewPostTextCreateAction, addPostCreateAction } from "../../../Redux/profile-reducer";
import StoreContext from "../../../StoreContext.jsx";
import MyPosts from './MyPosts';
import { connect, MapDispatchToProps } from "react-redux";
import { AppStateType } from "../../../Redux/redux-store";

import { PropsTypeDispatch, PropsTypeState } from './MyPosts';

// const addPostCreateAction = function () {
//   return { type: "ADD-POST", }
// }

// const updateNewPostTextCreateAction = function (text) {
//   return { type: "UPDATE-NEW-POST-TEXT", text: text}
// }

// type PropsTypeState = ReturnType<typeof mapStateToProps>;
// type PropsTypeDispatch = typeof mapDispatchToProps;

const forStoreContext_MyPostsContainer = function (props: any) {


  return (
    <StoreContext.Consumer>{   // without space: " ", or next string
      (store: any) => {
        function addPost() {
          store.dispatch(addPostCreateAction(""));
        }

        function commitChangesTextarea(text: any) {
          store.dispatch(updateNewPostTextCreateAction(text))
        }
        let state = store.getState();

        return <MyPosts
          posts={state.profilePage.posts}
          newPostText={state.profilePage.newPostText}
          addPost={addPost}
          commitChangesTextarea={commitChangesTextarea}
        />
      }
    }
    </StoreContext.Consumer>

  )
}

let mapStateToProps = function (state: AppStateType) {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}

let mapDispatchToProps = function (dispatch: any) {
  return {
    addPost: (post: string) => {
      dispatch(addPostCreateAction(post));
    },
    commitChangesTextarea: (text: string) => {
      dispatch(updateNewPostTextCreateAction(text));
    },
  }
}

const MyPostsContainer = connect<PropsTypeState, PropsTypeDispatch, {}, AppStateType>(
  mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;