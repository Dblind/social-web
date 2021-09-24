import { addPostCreateAction } from "./profile-reducer";


let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuthorized: false,
}

let authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      console.log("case set user");
      return {
        ...state,
        ...action.data,
        isAuthorized: true,
      }
    }
    default: console.log("Incorrect dispatch action type! type:\"" + action.type + "\".");
      break;
  }
  return state;
}

const SET_USER_DATA = "SET-USER-DATA";

export function setUserAuthenticationData(userId, email, login) { return { type: SET_USER_DATA, data: { userId, email, login }, } };

export default authenticationReducer;

