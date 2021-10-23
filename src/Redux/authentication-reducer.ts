import { stopSubmit } from "redux-form";
import { authentificationAPI, profileAPI, responseCodeForCaptcha, responseCodes, securityAPI } from "../api/api";
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
    let meData = await authentificationAPI.me()
    if (meData.resultCode === responseCodes.success) {
      dispatch(setUserAuthenticationData(
        meData.data.id,
        meData.data.email,
        meData.data.login,
      ));
    }
  }
}


export function login(email: string, password: string, rememberMe: boolean, captcha: null | string) {
  return async (dispatch: any) => {
    let loginData = await authentificationAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === responseCodes.success) {
      dispatch(authenticationMe());   // ????????????????
    } else {
      if (loginData.resultCode === responseCodeForCaptcha.captchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      let errorMessage = loginData.messages?.length > 0 ? loginData.messages[0] : "Some error!";
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
        if (response.data.resultCode === responseCodes.success) {
          dispatch(setUserAuthenticationData(null, null, null));   // ????????????????
          //dispatch(authenticationMe());   // ????????????????

        }
      })
  }
}

export default authenticationReducer;

