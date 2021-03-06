import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { ContactsType, ProfileType } from '../../../types/types';
import { Input } from '../../common/FormsControls/FormsControls';
import Preloader from '../../common/Preloader/Preloader';
import photoAvatar from './avatarGirl.jpg';
import ProfileEditForm from './forms/ProfileEditForm';
import css from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import ProfileStatus_WithHooks from './ProfileStatus_WithHooks';

type PropsTypeProfileInfo = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  sendPhoto: (file: File) => void;
  saveProfile: (profileData: ProfileType) => Promise<any>;
}

const ProfileInfo: React.FC<PropsTypeProfileInfo> = function (props) {
  let [editMode, setEditMode] = useState(false);

  const onPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) props.sendPhoto(event.target.files[0]);
  }

  function onSubmitProfileData(formData: ProfileType) {
    console.log("fotm data", formData);
    props.saveProfile(formData)   // TODO: remove .then();
      .then(() => {                 // &??????????????
        setEditMode(false);
      })
      .catch((error) => console.log(error));
  }

  // console.log("profile", props.profile);
  if (props.profile)
    return (
      <div className={css.profileInfo}>
        <div>
          <img
            src={props.profile.photos?.large || props.profile.photos?.small || photoAvatar}
            alt="content"
            className={css.avatar} />
          {props.isOwner && <input type={"file"} onChange={onPhotoSelected} />}
        </div>
        {/* <ProfileStatus status={"I'm learn js react and sweetie Sveta."} /> */}
        <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
        <ProfileStatus_WithHooks status={props.status} updateStatus={props.updateStatus} />
        <ProfileData profile={props.profile} />
        {props.isOwner && <div>
          <button
            style={{ padding: "5px", backgroundColor: "#e06", }}
            onClick={() => setEditMode(!editMode)} value="valueD">
            edit
          </button>
        </div>}
        {editMode
          ? <ProfileEditForm
            initialValues={props.profile}   // default values for inputs redux-form
            profile={props.profile}
            onSubmit={onSubmitProfileData} />
          : null}
      </div>
    )
  else return <Preloader />
}

type PropsTypeProfileData = {
  profile: ProfileType,
  // goToEditMode: () => void,
}

const ProfileData: React.FC<PropsTypeProfileData> = (props) => {
  return (
    <div>
      <h3>???????????? ??????</h3>
      <p>{props.profile.fullName}</p>
      <h3>?????? ????????????</h3>
      <p>{props.profile.lookingForAJob ? "??????." : "???? ??????."}</p>
      <h3>?????????? ???????????? ????????</h3>
      <p>{props.profile.lookingForAJobDescription}</p>
      <h3>?????? ??????</h3>
      <p>{props.profile.aboutMe}</p>
      <h3>????????????????</h3>
      <div>
        <ul>
          <li>FB: {props.profile.contacts.facebook}</li>
          <li>Website: {props.profile.contacts.website}</li>
          <li>VK: {props.profile.contacts.vk}</li>
          <li>TW: {props.profile.contacts.twitter}</li>
          <li>Instagram: {props.profile.contacts.instagram}</li>
          <li>Youtube: {props.profile.contacts.youtube}</li>
          <li>GitHub: {props.profile.contacts.github}</li>
          <li>MailLink: {props.profile.contacts.mailLink}</li>
          <hr />
          <Contacts contacts={props.profile.contacts} />
        </ul>
        nickname + description
      </div>
    </div>
  )
}

type PropsTypeContacts = {
  contacts: ContactsType,
}

const Contacts: React.FC<PropsTypeContacts> = (props) => {
  let contacts = { ...props.contacts, test: "contact for testing", };
  let contactsLi = [];
  if (contacts)
    for (let e in contacts) {
      if (contacts[e as keyof ContactsType])
        contactsLi.push(<li key={e}><strong>{e}</strong>: {contacts[e as keyof ContactsType]}</li>);
    }

  return (
    <>{contactsLi}</>
  )
}



export default ProfileInfo;