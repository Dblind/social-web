import React from 'react';
import css from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserProfile, setUserProfile } from '../../Redux/profile-reducer';
import { Redirect, withRouter } from 'react-router';
import { usersAPI } from '../../api/api';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import DialogsContainer from '../Dialogs/DialogsContainer';
import { compose } from 'redux';


class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 2,
    }

  }
  componentDidMount() {
    this.getProfileFromServer(this.state.userId);
  }

  getProfileFromServer(id = 2) {
    this.state.userId = this.props.match.params.userId ?? id;

    this.props.getUserProfile(this.state.userId);
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
          let temp = this.state.userId + 1;
          this.props.getUserProfile(temp);
          this.setState({ userId: temp, });
          console.log("+1", this.state.userId);
        }}>+</button>
        <button onClick={() => {
          let temp = this.state.userId - 1;
          this.props.getUserProfile(temp);
          this.setState({ userId: temp, });
          console.log("+1", this.state.userId);
        }}>-</button>
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
  }
}

let mapDispatchToProps = {
  setUserProfile,
  getUserProfile,
}

//  index.js => App => <BrowseRouter/> <Route /profile/:userId? > => connect()() => withRoute() => ContainerProfile => Profile
let WithUrlDataContainerComponent = withRouter(authRedirectComponent);


// export default connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  // withAuthRedirect  // TODO: blocking and redirect to login page in time reload browser
)(ProfileContainer);