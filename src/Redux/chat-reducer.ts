import React from "react";
import { Dispatch } from "redux";
import { chatAPI, TChatMessage, TStatus } from "../api/chat-api";
import { BaseThunkType, InferActionTypes } from "./redux-store";

const initialState = {
  messages: [] as TChatMessage[],
  status: "pending" as TStatus,
}

const chatReducer = (state = initialState, action: TActionTypes) => {
  switch (action.type) {
    case "sn/chat/MESSAGES_RESEIVED": {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages].filter((m, index, array) => index > array.length - 100),
      }
    }
    case "sn/chat/STATUS_CHANGED": {
      return {
        ...state,
        status: action.payload.status,
      }
    }
    default: {
      return state;
    }
  }
}

const messagesReseived = (messages: TChatMessage[]) => { return { type: "sn/chat/MESSAGES_RESEIVED", payload: { messages } } as const };
const statusChanged = (status: TStatus) => { return { type: "sn/chat/STATUS_CHANGED", payload: { status } } as const };

const actions = { messagesReseived, statusChanged }
export type TActionTypes = InferActionTypes<typeof actions>;

export type TThunkType = BaseThunkType<TActionTypes>;

let _newMessageHandler: ((messages: TChatMessage[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (!_newMessageHandler) {
    _newMessageHandler = (messages: TChatMessage[]) => {
      dispatch(messagesReseived(messages));
    }
  }
  return _newMessageHandler;
}

let _statusChangedHandler: ((status: TStatus) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (!_statusChangedHandler) {
    _statusChangedHandler = (status) => {
      dispatch(statusChanged(status));
    }
  }
  return _statusChangedHandler;
}

export const startMessagesListening = (): TThunkType =>
  async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe("message-reseived", newMessageHandlerCreator(dispatch));
    chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
  }

export const stopMessagesListening = (): TThunkType =>
  async (dispatch) => {
    chatAPI.stop();
    chatAPI.unsubscribe("message-reseived", newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch));
  }

export const sendMessage = (message: string): TThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  }


export default chatReducer;

