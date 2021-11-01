import React from "react";
import { Dispatch } from "redux";
import { chatAPI, TChatMessage } from "../api/chat-api";
import { BaseThunkType, InferActionTypes } from "./redux-store";

const initialState = {
  messages: [] as TChatMessage[],
}

const chatReducer = (state = initialState, action: TActionTypes) => {
  switch (action.type) {
    case "sn/chat/MESSAGES_RESEIVED": {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      }
    }
    default: {
      return state;
    }
  }
}

const messagesReseived = (messages: TChatMessage[]) => { return { type: "sn/chat/MESSAGES_RESEIVED", payload: { messages } } as const };

const actions = { messagesReseived, }
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

  export const startMessagesListening = (): TThunkType =>
    async (dispatch) => {
      chatAPI.start();
      chatAPI.subscribe(newMessageHandlerCreator(dispatch));
    }

  export const stopMessagesListening = (): TThunkType =>
    async (dispatch) => {
      chatAPI.stop();
      chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
    }

    export const sendMessage = (message: string): TThunkType =>
    async (dispatch) => {
      chatAPI.sendMessage(message);
    }


  export default chatReducer;