import { message } from 'antd';
import { WSA_E_CANCELLED } from 'constants';
import React, { MouseEventHandler, useEffect, useState } from 'react';

export type TChatMessage = {
  message: string,
  photo: string,
  userId: number,
  userName: string,
}


const ChatPage: React.FC = (props) => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat: React.FC = (props) => {
  const [wsChannel, setWSChannel] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    const closeHandler = () => {
      console.log("cloce WS");
      setTimeout(createChannel, 3000);
    };

    function createChannel() {
      ws?.removeEventListener("close", closeHandler);
      ws?.close(); 

      ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
      ws.addEventListener("close", closeHandler);
      setWSChannel(ws);
    }

    createChannel();

    return () => {
      ws.removeEventListener("close", closeHandler);
      ws.close();
    }
  }, []);

  useEffect(() => {
    wsChannel?.addEventListener("close", () => {
      console.log("cloce WS");
    });
  }, [wsChannel]);


  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  )
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [messages, setMessages] = useState<TChatMessage[]>([]);


  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const newMessages = JSON.parse(event.data);
      // setMessages([...messages, ...newMessages,]);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };

    wsChannel?.addEventListener("message", messageHandler);

    return () => {
      wsChannel?.removeEventListener("message", messageHandler);
    }
  }, [wsChannel]);

  // const messages: string[] = ["message 1", "message 2", "message 3", "message 1", "message 2", "message 3", "message 1", "message 2", "message 3"];
  const style = { height: "300", overflowY: "auto", };

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

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [message, setMessage] = useState("");
  const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");

  const openHandler = () => { setReadyStatus("ready"); };

  useEffect(() => {
    wsChannel?.addEventListener("open", openHandler);

    return () => { wsChannel?.removeEventListener("open", openHandler); };
  }, [wsChannel]);

  const sendMessage = () => {
    if (!message) return;

    wsChannel?.send(message);
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
          <button disabled={wsChannel == null || readyStatus !== "ready"} onClick={sendMessage}>send</button>
        </li>
      </section>
    </div>
  )
}

export default ChatPage;