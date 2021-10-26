import React, { ChangeEvent, MouseEventHandler } from "react";
import Post from "./Post/Post";
import css from './MyPosts.module.css';
import { updateNewPostTextCreateAction, addPostCreateAction } from "../../../Redux/profile-reducer";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLength, required, minLength } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";
import { PostType } from "../../../types/types";

// const addPostCreateAction = function () {
//   return { type: "ADD-POST", }
// }

// const updateNewPostTextCreateAction = function (text) {
//   return { type: "UPDATE-NEW-POST-TEXT", text: text}
// }

export type PropsTypeState = {
  posts: PostType[],
  newPostText: string,
}
export type PropsTypeDispatch = {
  addPost: (post: string) => void,
  commitChangesTextarea: (chengedText: string) => void,
}

const MyPosts: React.FC<PropsTypeState & PropsTypeDispatch> = function (props) {
  let postModules = props.posts.map((post, i) => <Post key={"a" + i} numberPost={i + 1} id={post.id} message={post.message ?? "non"} />);

  let refTextarea = React.createRef();

  const addPost = (formData: NewPostFormDataType) => {
    console.log("formData", formData);
    props.addPost(formData.postProfile);
  }

  function changeTextarea(event: ChangeEvent<HTMLTextAreaElement>) {
    let text = event.target.value;
    props.commitChangesTextarea(text);
  }

  return (
    <div className={css.wrapper}>
      <form className={css.newPostForm}>
        <div><span>My post</span></div>
        <textarea
          // ref={refTextarea}
          value={props.newPostText}
          onChange={changeTextarea}
          placeholder="Read your post hear..."
          name="my post" id="my-post" 
          // cols="100" rows="3"
        />

        <div>
          {/* <input onClick={addPost} id="newPost" type="button" value="add post" /> */}
          <input type="submit" value="Submit native" />
          <button onClick={(event:any) => { addPost(event.target.value); event.preventDefault(); }}>b send onclick</button>
        </div>
      </form>

      <hr />
      <NewPostForm_ReduxForm onSubmit={addPost} />

      {postModules}
      <hr />
    </div>
  )
}


const MyPostsMemorized = React.memo(MyPosts);
export default MyPostsMemorized;



const maxLength30 = maxLength(30);
const minLength3 = minLength(3);
type PropsType = {}
type NewPostFormDataType = { postProfile: string, };

const NewPostForm: React.FC<InjectedFormProps<NewPostFormDataType, PropsType> & PropsType> = (props) => {
  return (
    <div className={css.wrapper}>
      <form onSubmit={props.handleSubmit} className={css.newPostForm}>
        {/* <div><span>My post Redux Form</span></div> */}
        <Field component={Textarea} placeholder="Write your post hear..."
          validate={[required, maxLength30, minLength3,]}
          name="postProfile" id="myPost" cols="100" rows="3" />
        <div>
          <button>add post Redux Form</button>
        </div>
      </form>
    </div>
  )
}

const NewPostForm_ReduxForm = reduxForm<NewPostFormDataType, PropsType>({
  form: "NewPostFormProfile",
})(NewPostForm);