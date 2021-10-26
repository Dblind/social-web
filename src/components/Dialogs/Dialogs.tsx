import React from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { maxLength, required, minLength } from "../../utils/validators/validators";
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import css from './Dialogs.module.css';
import { Textarea } from '../common/FormsControls/FormsControls';
import { InitialState } from '../../Redux/dialogs-reducer';
import { UserType } from '../../types/types';

type OwnPropTypes = {
  dialogsPage: InitialState,
  changeTextarea: (text: string) => void,
  sendPost: (post: string) => void,
}
type DialogsFormData = { postDialogs: string }

let post = "new post";
const Dialogs: React.FC<OwnPropTypes> = (props) => {
  let UserComponents = props.dialogsPage.collectionUsers
    .map((user) => <DialogItem name={user.name} id={user.id} />);
  let MessageComponents = props.dialogsPage.collectionMessages
    .map((mes) => <Message message={mes.message} />);

  function onSubmitNewPost(formResponse: DialogsFormData) {
    console.log(formResponse.postDialogs);
    post = formResponse.postDialogs;
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
        <NewPost_ReduxForm onSubmit={onSubmitNewPost} newPost={post} />
        <div>returned post: {post}</div>
        {MessageComponents};
      </div>
    </div>
  )
}

const DialogItem: React.FC<{ id: number, name: string, }> = function (props) {
  const relativePath = `/dialogs/${props.id}`;
  return <div>
    <NavLink to={relativePath}>{props.name}</NavLink>
  </div>
}

const Message: React.FC<{ message: string }> = function (props) {
  return (
    <div className={css.post}>
      {props.message}
    </div>
  )
}

let textarea = React.createRef();

type PropsNewPost = {
  changeTextarea: (text: string) => void,
  sendPost: (post: string) => void,
  newMessageBody: string,
}
function NewPost(props: PropsNewPost) {
  function changeTextarea(event: any) {
    props.changeTextarea(event.target.value);
  }
  function newPost(text: string) {
    props.sendPost(text);
  }
  return (
    <div className="newPost">
      <form action="">
        <textarea
          // ref={textarea} 
          placeholder="Enter your post"
          name="newPost" id="newPost" 
          // cols="30" rows="10"
          onChange={changeTextarea} value={props.newMessageBody}
        />
        <input type="button" id="1" onClick={event => newPost("")} value="send" />
      </form>
    </div>
  )
}

const maxLength30 = maxLength(30);
const minLength3 = minLength(3);
type AddMessageFormDataOwn = { newPost: string, };
const AddMessageForm: React.FC<InjectedFormProps<DialogsFormData, AddMessageFormDataOwn> & AddMessageFormDataOwn>
  = ({ handleSubmit, newPost }) => {
    return (
      <div>
        <form action="" onSubmit={handleSubmit}>
          <Field placeholder="Enter your new post..." component={Textarea}
            validate={[required, maxLength30, minLength3]}
            name="postDialogs" id="post" cols="55" rows="5" />
          <button>Submit</button>
        </form>
        <div>
          <input type="text" value={newPost} />
          new post: {newPost}
        </div>
      </div>
    )
  }

const NewPost_ReduxForm = reduxForm<DialogsFormData, AddMessageFormDataOwn>({
  form: "newPost",
})(AddMessageForm);


export default Dialogs;