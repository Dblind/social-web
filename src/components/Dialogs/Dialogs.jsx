import React from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import css from './Dialogs.module.css';

const Dialogs = (props) => {
  let UserComponents = props.dialogsPage.collectionUsers
    .map((user) => <DialogItem name={user.name} id={user.id} />);
  let MessageComponents = props.dialogsPage.collectionMessages
    .map((mes) => <Message message={mes.message} />);
  
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


export default Dialogs;