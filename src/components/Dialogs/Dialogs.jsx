import React from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { maxLength, required, minLength } from "../../utils/validators/validators";
import { Field, reduxForm } from 'redux-form';
import css from './Dialogs.module.css';
import { Textarea } from '../common/FormsControls/FormsControls';

let post = "new post";
const Dialogs = (props) => {
  let UserComponents = props.dialogsPage.collectionUsers
    .map((user) => <DialogItem name={user.name} id={user.id} />);
  let MessageComponents = props.dialogsPage.collectionMessages
    .map((mes) => <Message message={mes.message} />);

  function onSubmitNewPost(formResponse) {
    console.log(formResponse.post);
    post = formResponse.post;
    props.sendPost(formResponse.postDialogs);
  }

  return (
    <div className={css.dialogs}>
      <div className={css.dialogNames}>
        {UserComponents}
      </div>

      <div className={css.messages}>
        <NewPost
          newMessageBody={props.dialogsPage.newMessageBody}
          changeTextarea={props.changeTextarea}
          sendPost={props.sendPost}
        />
        <hr />
        <NewPost_ReduxForm onSubmit={onSubmitNewPost} newPost={post}/>
        <div>returned post: {post}</div>
        {MessageComponents};
      </div>
    </div>
  )
}

const DialogItem = function (props) {
  const relativePath = `/dialogs/${props.id}`;
  return <div>
    <NavLink to={relativePath}>{props.name}</NavLink>
  </div>
}

const Message = function (props) {
  return (
    <div className={css.post}>
      {props.message}
    </div>
  )
}

let textarea = React.createRef();


function NewPost(props) {
  function changeTextarea(event) {
    props.changeTextarea(event.target.value);
  }
  function newPost() {
    props.sendPost();
  }
  return (
    <div className="newPost">
      <form action="">
        <textarea
          ref={textarea} placeholder="Enter your post"
          name="newPost" id="newPost" cols="30" rows="10"
          onChange={changeTextarea} value={props.newMessageBody}
        />
        <input type="button" id="1" onClick={newPost} value="send" />
      </form>
    </div>
  )
}

const maxLength30 = maxLength(30);
const minLength3 = minLength(3);
function AddMessageForm(props) {
  console.log("props", props);
  return (
    <div>
      <form action="" onSubmit={props.handleSubmit}>
        <Field placeholder="Enter your new post..." component={Textarea}
          validate={[required, maxLength30, minLength3]}
          name="postDialogs" id="post" cols="55" rows="5" />
        <button>Submit</button>
      </form>
      <div>
        <input type="text" value={props.newPost} />
        new post: {props.newPost}
      </div>
    </div>
  )
}

const NewPost_ReduxForm = reduxForm({
  form: "newPost",
})(AddMessageForm);


export default Dialogs;