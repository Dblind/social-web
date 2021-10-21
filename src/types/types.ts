// profile
export type ProfileType = {
  userId: number,
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  fullName: string,
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
  mainLink: string | null,
}
export type PostType = { id: Number | string, message: String, likesCount: Number, }
export type PhotosType = { small: string | null, large: string | null, }

// users 
export type UserType = { id: Number, followed: Boolean, name: String, status: String, location: LocationType, photos: PhotosType, };
export type LocationType = { city: String, country: String, };