import React from "react";
import Post from "./Post/Post";
import css from './MyPosts.module.css';
import { updateNewPostTextCreateAction, addPostCreateAction } from "../../../Redux/profile-reducer.jsx";

// const addPostCreateAction = function () {
//   return { type: "ADD-POST", }
// }

// const updateNewPostTextCreateAction = function (text) {
//   return { type: "UPDATE-NEW-POST-TEXT", text: text}
// }

const MyPosts = function (props) {
  console.log("props", props);
  let postModules = props.posts.map((post, i) => <Post numberPost={i + 1} id={post.id} message={post.message ?? "non"} />);

  let refTextarea = React.createRef();

  function addPost() {
    props.addPost();
  }

  function changeTextarea(event) {
    let text = event.target.value;
    props.commitChangesTextarea(text);
  }

  return (
    <div className={css.wrapper}>
      <form className={css.newPostForm}>
        <div><span>My post</span></div>
        <textarea 
          ref={refTextarea} 
          onChange={changeTextarea} 
          value={props.newPostText}
          placeholder="Read your post hear..."
          name="my post" id="my-post" cols="100" rows="3" 
          />

        <div>
          <input onClick={addPost} id="newPost" type="button" value="add post" />
          <input type="submit" value="Submit" />
          <button onClick={addPost}>b send onclick</button>
        </div>
      </form>

      {postModules}
      <hr />
    </div>
  )
}

export default MyPosts;