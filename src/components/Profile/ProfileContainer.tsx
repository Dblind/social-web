import React from 'react';
import css from './Profile.module.css';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, saveProfile, sendPhoto, updateStatus } from '../../Redux/profile-reducer';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/redux-store';
import { ProfileType } from '../../types/types';

let myId = 19834;

type PropsTypeState = ReturnType<typeof mapStateToProps>;
type PropsTypeDispatch = {
  updateStatus: (status: string) => void,
  sendPhoto: (file: File) => void,
  saveProfile: (profile: ProfileType) => Promise<any>,
  getUserProfile: (userId: number) => void,
  getUserStatus: (userId: number) => void,
}
type PathParamsType = { userId: string, };
type PropsTypeRouter = RouteComponentProps<PathParamsType>;
type CombinePropsType = PropsTypeState & PropsTypeDispatch & PropsTypeRouter;
type StateType = { userId: number | null, };

class ProfileContainer extends React.Component<CombinePropsType> {
  state: StateType;

  constructor(props: CombinePropsType) {
    super(props);
    this.state = {
      userId: 2,
    }

  }
  componentDidMount() {
    this.getProfileFromServer();
    console.log("did mount");
    // this.props.getUserStatus(this.state.userId);
  }

  getProfileFromServer() {
    this.state.userId = null;
    this.state.userId = +this.props.match.params.userId; // ?? myId;
    if (!this.state.userId) {
      this.state.userId = this.props.authorizedUserId;
      if (!this.state.userId) this.props.history.push("/login");
    }

    this.props.getUserProfile(this.state.userId as number);
    this.props.getUserStatus(this.state.userId as number);
  }

  componentDidUpdate(prevProps: CombinePropsType, prevState: StateType) {
    if (prevProps.match.params.userId != this.props.match.params.userId)
      this.getProfileFromServer();
    console.log("prevState", prevState);
    if (prevState.userId != this.state.userId) this.props.getUserProfile(this.state.userId as number);
  }

  iteratePage(mathOperator: string) {
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
      <div className={css.content}>
        <button onClick={() => { this.iteratePage("+"); }}>+</button>
        <button onClick={() => { this.iteratePage("-"); }}>-</button>

        
        <Profile
          {...this.props}
          isOwner={!this.props.match.params.userId}
        />
        {/* // profile={this.props.profile}/> */}
      </div>
    )
  }
}

let authRedirectComponent = withAuthRedirect(ProfileContainer);  // HOC redirect login

let authRedirectComponent_old = (props: any) => {
  if (!props.isAuth) { console.log(props.isAuth); return <Redirect to="/login" />; }

  return <ProfileContainer {...props} />
}

let mapStateToProps = (state: AppStateType) => {
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
  sendPhoto,
  saveProfile,
}

//  index.js => App => <BrowseRouter/> <Route /profile/:userId? > => connect()() => withRoute() => ContainerProfile => Profile
let WithUrlDataContainerComponent = withRouter(authRedirectComponent);


// export default connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent);

export default compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  // withAuthRedirect  // TODO: blocking and redirect to login page in time reload browser
)(ProfileContainer);