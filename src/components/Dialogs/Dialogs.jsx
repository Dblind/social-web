import React from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import css from './Dialogs.module.css';

let post = "new post";
const Dialogs = (props) => {
  let UserComponents = props.dialogsPage.collectionUsers
    .map((user) => <DialogItem name={user.name} id={user.id} />);
  let MessageComponents = props.dialogsPage.collectionMessages
    .map((mes) => <Message message={mes.message} />);

  function onSubmitNewPost(formResponse) {
    console.log(formResponse.post);
    post = formResponse.post;
    props.sendPost(formResponse.post);
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

function AddMessageForm(props) {
  console.log("props", props);
  return (
    <div>
      <form action="" onSubmit={props.handleSubmit}>
        <Field placeholder="Enter your new post..." component="textarea"
          name="post" id="post" cols="55" rows="5" />
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