import { RefCallback } from "react";
import { instance, responseCodeForCaptcha, responseCodes, ServerResponseType } from "./api";


type MeResponseData = { id: number, login: string, email: string, };
type LoginResponseData = { userId: number, };

export const authentificationAPI = {
  me,
  login,
  logout,
}

function me() {
  return instance.get < ServerResponseType<MeResponseData>>("/auth/me")
    .then(res => res.data);
}

function login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
  return instance
    .post<ServerResponseType<LoginResponseData, responseCodes & responseCodeForCaptcha>>
        ("/auth/login", { email, password, rememberMe, captcha })
    .then(res => res.data);
}

function logout() {
  return instance.delete("/auth/login");
}