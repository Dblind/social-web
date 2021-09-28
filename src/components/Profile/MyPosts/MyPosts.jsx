import React from "react";
import Post from "./Post/Post";
import css from './MyPosts.module.css';
import { updateNewPostTextCreateAction, addPostCreateAction } from "../../../Redux/profile-reducer.jsx";
import { Field, reduxForm } from "redux-form";

// const addPostCreateAction = function () {
//   return { type: "ADD-POST", }
// }

// const updateNewPostTextCreateAction = function (text) {
//   return { type: "UPDATE-NEW-POST-TEXT", text: text}
// }

const MyPosts = function (props) {
  let postModules = props.posts.map((post, i) => <Post numberPost={i + 1} id={post.id} message={post.message ?? "non"} />);

  let refTextarea = React.createRef();

  const addPost = (formData) => {
    console.log("formData", formData);
    props.addPost(formData.post);
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

      <hr />
      <NewPostForm_ReduxForm onSubmit={addPost} />

      {postModules}
      <hr />
    </div>
  )
}

export default MyPosts;

function NewPostForm(props) {
  return (
    <div className={css.wrapper}>
      <form onSubmit={props.handleSubmit} className={css.newPostForm}>
        {/* <div><span>My post Redux Form</span></div> */}
        <Field component="textarea" placeholder="Write your post hear..."
          name="post" id="myPost" cols="100" rows="3" />
        <div>
          <button>add post Redux Form</button>
        </div>
      </form>
    </div>
  )
}

const NewPostForm_ReduxForm = reduxForm({
  form: "NewPostFormProfile",
})(NewPostForm);