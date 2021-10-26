// profile
export type ProfileType = {
  userId: number,
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  fullName: string,
  aboutMe: string | null,
  contacts: ContactsType,
  photos: null | PhotosType,
}
export type ContactsType = {
  github: string | null,
  vk: string | null,
  facebook: string | null,
  instagram: string | null,
  twitter: string | null,
  website: string | null,
  youtube: string | null,
  mailLink: string | null,
}
export type PostType = { id: number, message: string, likesCount: number, }
export type PhotosType = { small: string | null, large: string | null, }

// users 
export type UserType = { id: number, followed: boolean, name: string, status: string, location: LocationType, photos: PhotosType, };
export type LocationType = { city: string, country: string, };