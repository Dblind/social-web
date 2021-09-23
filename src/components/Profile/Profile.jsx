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

function Content(props) {
  return (
    <div class={css.content}>
      <ProfileInfo />
      
      <MyPostsContainer 
        state={props.state}
        dispatch={props.dispatch}
        />
    </div>
  )
}
export default Content;