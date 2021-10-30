import { message } from 'antd';
import { WSA_E_CANCELLED } from 'constants';
import React, { MouseEventHandler, useEffect, useState } from 'react';

export type TChatMessage = {
  message: string,
  photo: string,
  userId: number,
  userName: string,
}

const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

const ChatPage: React.FC = (props) => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat: React.FC = (props) => {


  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  )
}

const Messages: React.FC = (props) => {
  const [messages, setMessages] = useState<TChatMessage[]>([]);

  useEffect(() => {
    wsChannel.addEventListener("message", (event) => {
      const newMessages = JSON.parse(event.data);
      // setMessages([...messages, ...newMessages,]);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    });
  }, []);

  // const messages: string[] = ["message 1", "message 2", "message 3", "message 1", "message 2", "message 3", "message 1", "message 2", "message 3"];
  const style = { height: "300", overflowY: "auto", };

  return (
    <div style={{ height: 300, overflowY: "auto", }}>
      <h1>MESSAGES</h1>
      {messages.map(m => <Message message={m} />)}

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

const AddMessageForm: React.FC = (props) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if(!message) return;

    wsChannel.send(message);
    setMessage("");
  }

  return (
    <div>
      <form action="">
        <li>
          <textarea name="message" id="message"
            onChange={event => setMessage(event.target.value)} 
            value={message} >
          </textarea>
        </li>
        <li>
          <button onClick={sendMessage}>send</button>
        </li>
      </form>
    </div>
  )
}

export default ChatPage;