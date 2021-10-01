import Preloader from '../../common/Preloader/Preloader';
import content from './avatarGirl.jpg';
import css from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus.jsx';
import ProfileStatus_WithHooks from './ProfileStatus_WithHooks';

const ProfileInfo = function (props) {
  if (props.profile)
    return (
      <div className={css.profileInfo}>
        <div>
          <img
            src={props.profile.photos?.large || props.profile.photos?.small || content}
            alt="content"
            className={css.avatar} />
        </div>
        {/* <ProfileStatus status={"I'm learn js react and sweetie Sveta."} /> */}
        <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
        <ProfileStatus_WithHooks status={props.status} updateStatus={props.updateStatus} />
        <h3>Контакты</h3>
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
          </ul>
          <h3>Ищу работу</h3>
          <p>{props.profile.lookingForAJob ? "Ищу." : "Не ищу."}</p>
          <h3>Какую работу хочу</h3>
          <p>{props.profile.lookingForAJobDescription}</p>
          <h3>Полное имя</h3>
          <p>{props.profile.fullName}</p>
          nickname + description
        </div>
      </div>
    )
  else return <Preloader />
}

export default ProfileInfo;