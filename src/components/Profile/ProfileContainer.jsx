import React from 'react';
import css from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../Redux/profile-reducer';


class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: 2,
    }

  }
  componentDidMount() {
    this.getProfileFromServer(this.state.idUser);
  }

  getProfileFromServer(id) {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
      .then(response => {
        this.props.setUserProfile(response.data);
      });
  }

  render() {
    return (
      <div class={css.content}>
        {/* <ProfileInfo />

        <MyPostsContainer
          state={props.state}
          dispatch={props.dispatch}
        /> */}
        <button onClick={() => {
          this.setState({ idUser: this.state.idUser + 1 });
          console.log("+1", this.state.idUser);
          this.getProfileFromServer(this.state.idUser);
        }}>+</button>
        <Profile {...this.props} />
        {/* // profile={this.props.profile}/> */}
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  }
}

let mapDispatchToProps = {
  setUserProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);