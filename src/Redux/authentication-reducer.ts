import { Action } from "redux";
import { stopSubmit, StopSubmitAction } from "redux-form";
import { responseCodeForCaptcha, responseCodes } from "../api/api";
import { authentificationAPI } from "../api/authentication-api";
import { securityAPI } from "../api/security-api";
import { addPostCreateAction } from "./profile-reducer";
import { BaseThunkType, InferActionTypes } from "./redux-store";



let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuthorized: false,
  captchaUrl: null as string | null,
}

type InitialState = typeof initialState;
let authenticationReducer = (state = initialState, action: CombinedActionTypes): InitialState => {
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

const SET_USER_DATA = "sn/authentication/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "sn/authentication/GET_CAPTCHA_URL_SUCCESS";

export function setUserAuthenticationData(
  userId: number | null,
  email: string | null,
  login: string | null) {
  return { type: SET_USER_DATA, payload: { userId, email, login }, } as const
};

export function getCaptchaUrlSuccess(captchaUrl: string) {
  return { type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }, } as const
};

  // thunks

const actions = { setUserAuthenticationData, getCaptchaUrlSuccess, };
type CombinedActionTypes = InferActionTypes<typeof actions>;
type ThunkTypes = BaseThunkType<CombinedActionTypes | ReturnType<typeof stopSubmit>>;

export function authenticationMe(): ThunkTypes {
  return async (dispatch) => {
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

export function login(email: string, password: string, rememberMe: boolean, captcha: null | string): ThunkTypes {
  return async (dispatch) => {
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

export function getCaptchaUrl(): ThunkTypes {
  return async (dispatch) => {
    const responseData = await securityAPI.getCaptchaUrl()
    const captchaUrl = responseData.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  }
}

export function logout(): ThunkTypes {
  return async (dispatch) => {
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

