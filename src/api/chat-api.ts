import { message } from "antd";

let subscribers = {
  "message-reseived": [] as TMessageReseivedSubscriber[],
  "status-changed": [] as TStatusChangedSubscriber[],
};
let ws: WebSocket | null;

function createChannel() {
  cleanUp();
  ws?.close(); 
  
  ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
  notifySubscribersAboutStatus("pending");
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
  ws.addEventListener("open", openHandler);
  ws.addEventListener("error", errorHandler);
}
function cleanUp() {
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
  ws?.removeEventListener("open", openHandler);
  ws?.removeEventListener("error", errorHandler);
}
function notifySubscribersAboutStatus(status: TStatus) {
  subscribers["status-changed"].forEach(sub => sub(status));
}
function closeHandler() {
  console.log("cloce WS");
  notifySubscribersAboutStatus("pending");
  setTimeout(createChannel, 3000);
}

function messageHandler(event: MessageEvent) {
  const newMessages = JSON.parse(event.data);
  // setMessages([...messages, ...newMessages,]);
  // setMessages((prevMessages) => [...prevMessages, ...newMessages]);
  subscribers["message-reseived"].forEach(sub => sub(newMessages));
};
function openHandler() {
  notifySubscribersAboutStatus("ready");
};
function errorHandler() {
  notifySubscribersAboutStatus("error");
  console.log("Web Socket ERROR! Try restart page.");
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
  subscribers["message-reseived"] = [];
  subscribers["status-changed"] = [];
  cleanUp();
  ws?.close();
}

function subscribe(eventName: TEventName, callback: TMessageReseivedSubscriber | TStatusChangedSubscriber) {
  // @ts-ignore
  subscribers[eventName].push(callback);
  return () => {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(sub => sub !== callback);
  }
}

function unsubscribe(eventName: TEventName, callback: TMessageReseivedSubscriber | TStatusChangedSubscriber) {
  // @ts-ignore
  subscribers[eventName] = subscribers[eventName].filter(sub => sub !== callback);
}

function sendMessage(message: string) {
  ws?.send(message);
}


type TEventName = "message-reseived" | "status-changed";
type TMessageReseivedSubscriber = (message: TChatMessage[]) => void;
type TStatusChangedSubscriber = (status: TStatus) => void;
export type TStatus = "pending" | "ready" | "error";

export type TChatMessage = {
  message: string,
  photo: string,
  userId: number,
  userName: string,
}