import { stopSubmit } from "redux-form";
import { authentificationAPI, profileAPI, securityAPI } from "../api/api";
import { addPostCreateAction } from "./profile-reducer";

export type InitialState = {
  userId: Number | null,
  email: string | null,
  login: string | null,
  isAuthorized: boolean | null,
  captchaUrl: string | null,
}

let initialState: InitialState = {
  userId: null,
  email: null,
  login: null,
  isAuthorized: false,
  captchaUrl: null,
}

let authenticationReducer = (state: InitialState = initialState, action: any): InitialState => {
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

export type SetUserAuthenticationData = {
  type: typeof SET_USER_DATA,
  payload: SubtypePayload,
}
export type SubtypePayload = {
  userId: number | null,
  email: string | null,
  login: string | null,
}
export function setUserAuthenticationData(
  userId: number | null,
  email: string | null,
  login: string | null): SetUserAuthenticationData {
  return { type: SET_USER_DATA, payload: { userId, email, login }, }
};

type GetCaptchaUrlSuccess = {
  type: typeof GET_CAPTCHA_URL_SUCCESS,
  payload: GetCaptchaUrlSuccessSubtypePayload,  // or { captchaUrl: string, }
}
type GetCaptchaUrlSuccessSubtypePayload = {
  captchaUrl: string,
}
export function getCaptchaUrlSuccess(captchaUrl: string): GetCaptchaUrlSuccess {
  return { type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }, }
};


export function authenticationMe() {
  return async (dispatch: any) => {
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


export function login(email: string, password: string, rememberMe: boolean, captcha: null | string) {
  return async (dispatch: any) => {
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
  return async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  }
}

export function logout() {
  return (dispatch: any) => {
    authentificationAPI.logout()
      .then(response => {
        if (response.data.resultCode === 0) {
          dispatch(setUserAuthenticationData(null, null, null));   // ????????????????
          //dispatch(authenticationMe());   // ????????????????

        }
      })
  }
}

export default authenticationReducer;

