import content from './avatarGirl.jpg';
import css from './ProfileInfo.module.css';

const ProfileInfo = function(props) {
  return (
    <div className={css.profileInfo}>
      <div>
        <img src={content} alt="content" className={css.avatar}/>
      </div>
      <div>
        nickname + description
      </div>
    </div>
  )
}

export default ProfileInfo;