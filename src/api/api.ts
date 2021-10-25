import axios, { AxiosResponse } from "axios";

const baseURL = "https://social-network.samuraijs.com/api/1.0";

export enum responseCodes {
  success = 0,
  Error = 1,
}
export enum responseCodeForCaptcha {
  captchaIsRequired = 10,
}


export const getUsers_nativeVersion = (currentPage: number, pageSize: number) => {
  return axios.get(
    // `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPageNumb}&count=${this.props.pageSize}`)
    `${baseURL}/users?page=${currentPage}&count=${pageSize}`,
    { withCredentials: true, })
    .then(response => response.data);
}



// instance - axios.create()
// additional parameters for axios.get()

export const instance = axios.create({
  withCredentials: true,
  baseURL: baseURL,
  headers: { "API-KEY": "d0d8fea3-e35d-4a5d-8b18-bc86cf9e55b5" },
});

// ***********************

// ***********************

// ***********************

// ***********************

export type GetItemsType<T> = {
  items: T[],
  totalCount: number,
  error: string,
}

export type ServerResponseType<D = {}, RC = responseCodes> = {
  data: D,
  resultCode: RC,
  messages: string[],
}