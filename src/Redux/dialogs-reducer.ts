import state from './State';
import store from './State';

const initialState = {
  collectionUsers: [
    { name: "Arny", id: 1, },
    { name: "Gans", id: 4, },
    { name: "Garry", id: 9, },
    { name: "Andrey", id: 1, },
    { name: "Sasha", id: 2, },
    { name: "John", id: 3, },
    { name: "Valera", id: 4, },
    { name: "Anna", id: 5, },
  ] as Array<{ name: string, id: number, }>,
  collectionMessages: [
    { message: "Hello" },
    { message: "Good day now." },
    { message: "Will come to the park." },
    { message: "Hello" },
  ] as Array<{ message: string, }>,
  newMessageBody: "",
}

export type InitialState = typeof initialState;
const dialogsReducer = function (state: InitialState = initialState, action: any) {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY: {
      let stateCopy = { ...state };
      stateCopy.newMessageBody = action.text;
      return stateCopy;
    }
    case SEND_MESSAGE: {
      let stateCopy = { ...state };
      stateCopy.collectionMessages = [...state.collectionMessages];
      stateCopy.collectionMessages.push({
        message: action.post
          ? action.post
          : stateCopy.newMessageBody,
      });
      stateCopy.newMessageBody = "";
      return stateCopy;
    }
    default:
      return state;
  }

}

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

type SendMessageCreateAction = {
  type: typeof SEND_MESSAGE,
  post: string,
}
export const sendMessageCreateAction = function (post: string): SendMessageCreateAction {
  return { type: SEND_MESSAGE, post };
}

type UpdateNewMessageBodyCreateAction = {
  type: typeof UPDATE_NEW_MESSAGE_BODY,
  text: string,
}
export const updateNewMessageBodyCreateAction = function (text: string): UpdateNewMessageBodyCreateAction {
  return { type: UPDATE_NEW_MESSAGE_BODY, text: text, }
}

export default dialogsReducer;