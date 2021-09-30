import { stopSubmit } from "redux-form";
import { authentificationAPI, profileAPI } from "../api/api";
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
        ...action.payload,
        isAuthorized: action.payload.email ? true : false,
      }
    }
    default:
      return state;
  }
}

const SET_USER_DATA = "SET-USER-DATA";

export function setUserAuthenticationData(userId, email, login) { return { type: SET_USER_DATA, payload: { userId, email, login }, } };


export function authenticationMe() {
  return dispatch => {
    return authentificationAPI.me()
      .then(response => {
        if (response.data.resultCode === 0) {
          console.log("set response")
          dispatch(setUserAuthenticationData(
            response.data.data.id,
            response.data.data.email,
            response.data.data.login,
          ));
        }
      })
  }
}

export function login(email, password, rememberMe) {
  return dispatch => {
    authentificationAPI.login(email, password, rememberMe)
      .then(response => {
        if (response.data.resultCode === 0) {
          dispatch(authenticationMe());   // ????????????????
        } else {
          let errorMessage = response.data.messages?.length > 0 ? response.data.messages[0] : "Some error!";
          dispatch(stopSubmit("login", { password: "Password wrong!", _error: errorMessage, }));
        }
      })
  }
}


export function logout() {
  return dispatch => {
    authentificationAPI.logout()
      .then(response => {
        if (response.data.resultCode === 0) {
          // setUserAuthenticationData(null, null, null);   // ????????????????
          dispatch(authenticationMe());   // ????????????????

        }
      })
  }
}

export default authenticationReducer;

