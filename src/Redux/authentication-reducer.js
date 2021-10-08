import { stopSubmit } from "redux-form";
import { authentificationAPI, profileAPI, securityAPI } from "../api/api";
import { addPostCreateAction } from "./profile-reducer";


let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuthorized: false,
  captchaUrl: null,
}

let authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload,
        isAuthorized: action.payload.email ? true : false,
      }
    }
    case GET_CAPTCHA_URL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state;
  }
}

const SET_USER_DATA = "authentication/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

export function setUserAuthenticationData(userId, email, login) { return { type: SET_USER_DATA, payload: { userId, email, login }, } };
export function getCaptchaUrlSuccess(captchaUrl) { return { type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}, } };

export function authenticationMe() {
  return async dispatch => {
    let response = await authentificationAPI.me()
    if (response.data.resultCode === 0) {
      dispatch(setUserAuthenticationData(
        response.data.data.id,
        response.data.data.email,
        response.data.data.login,
      ));
    }
  }
}


export function login(email, password, rememberMe, captcha) {
  return async dispatch => {
    let response = await authentificationAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
      dispatch(authenticationMe());   // ????????????????
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
      let errorMessage = response.data.messages?.length > 0 ? response.data.messages[0] : "Some error!";
      dispatch(stopSubmit("login", { password: "Password wrong!", _error: errorMessage, }));
    }
  }
}

export function getCaptchaUrl() {
  return async dispatch => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
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

