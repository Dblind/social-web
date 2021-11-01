import { message } from 'antd';
import { WSA_E_CANCELLED } from 'constants';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TChatMessage } from '../../api/chat-api';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../Redux/chat-reducer';
import { AppStateType } from '../../Redux/redux-store';




const ChatPage: React.FC = (props) => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat: React.FC = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(startMessagesListening());

        return () => {
          dispatch(stopMessagesListening());
        }
    }, []);

  return (
    <div>
      <Messages  />
      <AddMessageForm  />
    </div>
  )
}

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);

  return (
    <div style={{ height: 300, overflowY: "auto", }}>
      <h1>MESSAGES</h1>
      {messages.map((m, index) => <Message key={index} message={m} />)}

    </div>
  )
}

const Message: React.FC<{ message: TChatMessage }> = ({ message }) => {


  return (
    <div>
      <img src={message.photo} alt="avatar" style={{ width: 40, }} />
      <span><b>{message.userName}</b></span>
      <br />
      <p>{message.message}</p>
      <hr />
    </div>
  )
}

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();


  const onSendMessage = () => {
    if (!message) return;

    dispatch(sendMessage(message));
    setMessage("");
  }

  return (
    <div>
      <section>
        <li>
          <textarea name="message" id="message"
            onChange={event => setMessage(event.target.value)}
            value={message} >
          </textarea>
        </li>
        <li>
          <button disabled={false} onClick={onSendMessage}>send</button>
        </li>
      </section>
    </div>
  )
}

export default ChatPage;