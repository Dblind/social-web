import state from './State';
import store from './State';

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

export const sendMessageCreateAction = function (post) {
  return { type: SEND_MESSAGE, post };
}
export const updateNewMessageBodyCreateAction = function (text) {
  return { type: UPDATE_NEW_MESSAGE_BODY, text: text, }
}

const dialogsReducer = function (state = store._state.dialogsPage, action) {
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

export default dialogsReducer;