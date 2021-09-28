import React from "react";
import { updateNewMessageBodyCreateAction } from "../../../Redux/dialogs-reducer.jsx";
import { updateNewPostTextCreateAction, addPostCreateAction } from "../../../Redux/profile-reducer.jsx";
import StoreContext from "../../../StoreContext.jsx";
import MyPosts from './MyPosts';
import { connect } from "react-redux";

// const addPostCreateAction = function () {
//   return { type: "ADD-POST", }
// }

// const updateNewPostTextCreateAction = function (text) {
//   return { type: "UPDATE-NEW-POST-TEXT", text: text}
// }

const forStoreContext_MyPostsContainer = function (props) {


  return (
    <StoreContext.Consumer>{   // without space: " ", or next string
      (store) => {
        function addPost() {
          store.dispatch(addPostCreateAction());
        }

        function commitChangesTextarea(text) {
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

let mapStateToProps = function (state) {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}

let mapDispatchToProps = function (dispatch) {
  return {
    addPost: (post) => {
      dispatch(addPostCreateAction(post));
    },
    commitChangesTextarea: (text) => {
      dispatch(updateNewPostTextCreateAction(text));
    },
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;