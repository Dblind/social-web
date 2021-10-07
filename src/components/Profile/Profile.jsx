import React from 'react';
import css from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';


// import Post from '../Post/Post';
// let textarea = React.createRef();
// function newPost() {
//   alert(textarea.current.value);
// }

// function NewPost(props) {
//   return (
//     <div className="newPost">
//       <form action="">
//         <textarea ref={textarea} name="newPost" id="newPost" cols="30" rows="10">Your post</textarea>
//         <button onclick={newPost}>Send</button>
//       </form>
//     </div>
//   )
// }

function Profile(props) {
  // debugger
  return (
    <div className={css.content}>
        
      <ProfileInfo 
        isOwner={props.isOwner}
        profile={props.profile} 
        status={props.status}
        updateStatus={props.updateStatus}
        sendPhoto={props.sendPhoto}
        saveProfile={props.saveProfile}
        />
      <MyPostsContainer />
    </div>
  )
}
export default Profile;