import { PhotosType, ProfileType } from "../types/types";
import { instance, ServerResponseType } from "./api";

export const profileAPI = {
  getProfile,
  getStatus,
  updateStatus,
  putPhoto,
  sendPhoto,
  saveProfile,
}

function getProfile(userId: number) {
  return instance.get<ProfileType>(`/profile/${userId}`)
    .then(res => res.data);
}

function getStatus(userId: number) {
  return instance.get<string>(`/profile/status/${userId}`)
    .then(res => res.data);
}

function updateStatus(status: string) {
  return instance.put<ServerResponseType>(`/profile/status`, { status: status, })
    .then(res => res.data);
}

function putPhoto(img: any) {  // faile
  return instance.put(`profile/status`, {
    small: "https://www.meme-arsenal.com/memes/ed71ac4efff3d04e446d619bb91107ff.jpg",
    large: "https://www.meme-arsenal.com/memes/ed71ac4efff3d04e446d619bb91107ff.jpg",
  })
}

function sendPhoto(file: File) {
  let formData = new FormData();
  formData.append("image", file);

  type Photos = { photos: PhotosType, };
  return instance.put<ServerResponseType<Photos>>(`/profile/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
    .then(res => res.data);
}

function saveProfile(formData: ProfileType) {
  return instance.put<ServerResponseType>(`/profile`, formData)
    .then(res => res.data);
}