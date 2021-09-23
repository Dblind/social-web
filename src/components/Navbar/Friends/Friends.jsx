import avatar from './avatar.png';
import css from './Friends.module.css';

function FriendRender(props) {
  return (
    <div className={css.friendConteiner}>
      <img src={avatar} alt="avatar" className="avatar" />
      <span>{props.name}</span>
    </div>
  )
};

function Friends(props) {
  let friendsComponents = props.friends.map((friend, i) => <FriendRender 
  pathImgAvatar={friend.pathImgAvatar}
  name={friend.name} num={i} />);
  return (
    <div>{friendsComponents}</div>
  )
};

export default Friends;