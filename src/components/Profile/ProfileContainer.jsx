import React from 'react';
import css from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateStatus } from '../../Redux/profile-reducer';
import { Redirect, withRouter } from 'react-router';
import { profileAPI, usersAPI } from '../../api/api';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import DialogsContainer from '../Dialogs/DialogsContainer';
import { compose } from 'redux';

let myId = 19834;

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 2,
    }

  }
  componentDidMount() {
    this.state.userId = this.props.match.params.userId ?? myId;
    this.getProfileFromServer();
    // this.props.getUserStatus(this.state.userId);
  }

  getProfileFromServer() {
    this.props.getUserProfile(this.state.userId);
    this.props.getUserStatus(this.state.userId);
    // usersAPI.getProfile(this.state.userId)
    // // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.state.userId}`)
    //   .then(response => {
    //      this.props.setUserProfile(response.data);
    //   });
  }


  render() {

    return (
      <div class={css.content}>
        <button onClick={() => {
          let temp = Number(this.state.userId) + 1;
          this.setState({ userId: temp, });
          this.getProfileFromServer(temp);
          console.log("+1", this.state.userId);
        }}>+</button>
        <button onClick={() => {
          let temp = Number(this.state.userId) - 1;
          this.setState({ userId: temp, });
          this.getProfileFromServer(temp);
          console.log("+1", this.state.userId);
        }}>-</button>

        <button onClick={() => {
          profileAPI.putPhoto();
          console.log("put photo");
        }}>put photo</button>

        <Profile {...this.props} />
        {/* // profile={this.props.profile}/> */}
      </div>
    )
  }
}

let authRedirectComponent = withAuthRedirect(ProfileContainer);  // HOC redirect login

let authRedirectComponent_old = props => {
  if (!props.isAuth) { console.log(props.isAuth); return <Redirect to="/login" />; }

  return <ProfileContainer {...props} />
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    // isAuth: state.auth.isAuthorized,   // cut to withAuthRedirect.js
    status: state.profilePage.status,
  }
}

let mapDispatchToProps = {
  getUserProfile,
  getUserStatus,
  updateStatus,
}

//  index.js => App => <BrowseRouter/> <Route /profile/:userId? > => connect()() => withRoute() => ContainerProfile => Profile
let WithUrlDataContainerComponent = withRouter(authRedirectComponent);


// export default connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  // withAuthRedirect  // TODO: blocking and redirect to login page in time reload browser
)(ProfileContainer);