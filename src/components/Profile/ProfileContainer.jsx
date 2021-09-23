import React from 'react';
import css from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../Redux/profile-reducer';


class ProfileContainer extends React.Component {
  componentDidMount() {
    let idUser = 2;
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${idUser}`)
      .then(response => {
        this.props.setUserProfile({d: 1,}); 
        console.log("data", response.data);       
      })
    }
    
    render() {
      return (
        <div class={css.content}>
        {/* <ProfileInfo />

        <MyPostsContainer
          state={props.state}
          dispatch={props.dispatch}
        /> */}
        <Profile {...this.props} profile={this.props.profile}/>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  console.log("state", state.profilePage.profile)
  return { 
    profile: state.profilePage.profile, 
  }
}

let mapDispatchToProps = {
  setUserProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);