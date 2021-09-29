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
    this.state.userId = this.props.match.params.userId; // ?? myId;
    if (!this.state.userId) {
      this.state.userId = myId;
    }
    this.getProfileFromServer();
    // this.props.getUserStatus(this.state.userId);
  }

  getProfileFromServer() {
    this.props.getUserProfile(this.state.userId);
    this.props.getUserStatus(this.state.userId);
  }

  componentDidUpdate(prevProps) {
    // this.getProfileFromServer();
  }

  iteratePage(mathOperator) {
    let temp = 0;
    switch (mathOperator) {
      case "+": { temp = Number(this.state.userId) + 1; break; }
      case "-": { temp = Number(this.state.userId) - 1; break; }
      default: return;
    }
    // this.getProfileFromServer(temp);
    this.setState({ userId: temp, });
    console.log("+1", this.state.userId);
  }


  render() {

    return (
      <div class={css.content}>
        <button onClick={() => { this.iteratePage("+"); } }>+</button>
        <button onClick={() => { this.iteratePage("-"); } }>-</button>

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
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuthorized,
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