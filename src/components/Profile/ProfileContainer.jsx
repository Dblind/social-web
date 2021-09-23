import React from 'react';
import css from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../Redux/profile-reducer';
import { withRouter } from 'react-router';


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

  getProfileFromServer(id) {
    this.state.userId = this.props.match.params.userId ?? 2;
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.state.userId}`)
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
          this.setState({ userId: this.state.userId + 1 });
          console.log("+1", this.state.userId);
          this.getProfileFromServer(this.state.userId);
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

//  index.js => App => <BrowseRouter/> <Route /profile/:userId? > => connect()() => withRoute() => ContainerProfile => Profile
let WithUrlDataContainerComponent = withRouter(ProfileContainer);       

export default connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent);