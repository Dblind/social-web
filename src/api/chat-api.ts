import { message } from "antd";

let subscribers: Array<TSubscriber> = [];
let ws: WebSocket | null;
function createChannel() {
  ws?.removeEventListener("close", closeHandler);
  ws?.close(); 

  ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
}
function closeHandler() {
  console.log("cloce WS");
  setTimeout(createChannel, 3000);
};

function messageHandler(event: MessageEvent) {
  const newMessages = JSON.parse(event.data);
  // setMessages([...messages, ...newMessages,]);
  // setMessages((prevMessages) => [...prevMessages, ...newMessages]);
  subscribers.forEach(sub => sub(newMessages));
};

export const chatAPI = {
  subscribe,
  unsubscribe,
  sendMessage,
  start,
  stop,
}

function start() {
  createChannel();
}

function stop() {
  subscribers = [];
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
  ws?.close();
}

function subscribe(callback: (messages: TChatMessage[]) => void) {
  subscribers.push(callback);
  return () => {
    subscribers = subscribers.filter(sub => sub !== callback);
  }
}

function unsubscribe(callback: (messages: TChatMessage[]) => void) {
  subscribers = subscribers.filter(sub => sub !== callback);
}

function sendMessage(message: string) {
  ws?.send(message);
}


type TSubscriber = (message: TChatMessage[]) => void;
export type TChatMessage = {
  message: string,
  photo: string,
  userId: number,
  userName: string,
}