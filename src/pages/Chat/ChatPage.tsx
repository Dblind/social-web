import { Divider, message } from 'antd';
import { WSA_E_CANCELLED } from 'constants';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
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

  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    }
  }, []);

  return (
    <div>
      {status === "error" && <div>Occured some trouble. Please refresh the page.<hr /></div>}
      <Messages />
      <AddMessageForm />
    </div>
  )
}

const Messages: React.FC = () => {
  console.log("message render");
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef?.current?.scrollIntoView({ behavior: "smooth", });
    }
  }, [messages]);

  function onScrollHandler(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    const element = event.currentTarget;
    if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 50)
      setIsAutoScroll(true);
    else setIsAutoScroll(false);
  }

  return (
    <div style={{ height: 300, overflowY: "auto", }} onScroll={onScrollHandler}>
      <h1>MESSAGES</h1>
      {messages.map((m, index) => <Message key={index} message={m} />)}

      <div ref={messagesAnchorRef}></div>
    </div>
  )
}

// const Message: React.FC<{ message: TChatMessage }> = ({ message }) => {
  const Message: React.FC<{ message: TChatMessage }> = React.memo(({ message }) => {
    console.log("message render");


  return (
    <div>
      <img src={message.photo} alt="avatar" style={{ width: 40, }} />
      <span><b>{message.userName}</b></span>
      <br />
      <p>{message.message}</p>
      <hr />
    </div>
  )
})

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

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
          <button disabled={status != "ready"} onClick={onSendMessage}>send</button>
        </li>
      </section>
    </div>
  )
}

export default ChatPage;