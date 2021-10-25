import { instance, ServerResponseType } from "./api";

export const securityAPI = {
  getCaptchaUrl,
}

type GetCaptchaUrl = { url: string, };
function getCaptchaUrl() {
  return instance.get<GetCaptchaUrl>(`/security/get-captcha-url`)
    .then(res => res.data);
}
