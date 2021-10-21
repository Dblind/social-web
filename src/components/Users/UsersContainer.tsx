import React from "react"
import { connect } from "react-redux";
// import { connect, MapStateToProps } from "react-redux";
import {
  follow, setCurrentPageNumb, toggleIsFetching,
  setTotalCountUsers, setUsers, unFollow,
  toggleFollowingProgress, getUsersThunkCreator, unFollowThunkCreator, followThunckCreator
} from "../../Redux/users-reducer";
import Users from "./Users";

import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";
import usersSelectors from "../../Redux/selectors/users-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../Redux/redux-store";


type MapStateToProps = {
  currentPageNumb: number,
  pageSize: number,
  isFetching: boolean,
  totalUsersCount: number,
  users: UserType[],
  followingInProgress: any,
}
type MapDispatchToProps = {
  getUsersThunkCreator: (currenPage: number, pageSize: number) => void,
  follow: (userId: number) => void,
  unFollow: (userId: number) => void,
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void,
  unFollowThunkCreator: any,
  followThunckCreator: any,
  setUsers: any,
  setCurrentPageNumb: any,
  setTotalCountUsers: any,
  toggleIsFetching: any,
}
type OwnPropsType = {
  pageTitle: string,  
}

type PropsType = MapStateToProps & MapDispatchToProps & OwnPropsType;


class UsersAPIContainer extends React.Component<PropsType> {
  // constructor(props: PropsType) {
  //   super(props);
  // }

  componentDidMount() {
    this.onGetUsersFromServer(1);
  }


  // https://social-network.samuraijs.com/
  onGetUsersFromServer = (page: number) => {
    this.props.getUsersThunkCreator(page, this.props.pageSize);
  }


  render() {
    return (<>
      <h2>{this.props.pageTitle}</h2>
      {this.props.isFetching
        ? <Preloader />
        : null}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPageNumb}
        users={this.props.users}
        onFollow={this.props.follow}
        onUnfollow={this.props.unFollow}
        onGetUsersFromServer={this.onGetUsersFromServer}
        toggleFollowingProgress={this.props.toggleFollowingProgress}
        followingInProgress={this.props.followingInProgress}
        unFollowThunkCreator={this.props.unFollowThunkCreator}
        followThunckCreator={this.props.followThunckCreator}
        // a2={2}
      />
    </>
    )
  }
}

// let withRedirectUsersContainer = withAuthRedirect(UsersAPIContainer);

function mapStateToProps(state: AppStateType): MapStateToProps {
  return {
    users: usersSelectors.getUsers(state),
    pageSize: usersSelectors.getPageSize(state),
    totalUsersCount: usersSelectors.getTotalUsersCount(state),
    currentPageNumb: usersSelectors.getCurrentPageNumb(state),
    isFetching: usersSelectors.getIsFetching(state),
    followingInProgress: usersSelectors.getFollowingInProgress(state),
  }
}
function mapDispatchToProps_old(dispatch: any) {
  return {
    onFollow(userId: number) {
      dispatch(follow(userId));
    },
    onUnfollow(userId: number) {
      dispatch(unFollow(userId));
    },
    setUsers: function (users: Array<UserType>) {
      dispatch(setUsers(users));
    },
    setCurrentPageNumb(numb: number) {
      dispatch(setCurrentPageNumb(numb));
    },
    setTotalCountUsers(count: number) {
      dispatch(setTotalCountUsers(count));
    },
    toggleIsFetching(isFetching: boolean) {
      dispatch(toggleIsFetching(isFetching));
    },
  }
}

const mapDispatchToProps: MapDispatchToProps = {
  follow,
  unFollow,
  setUsers,
  setCurrentPageNumb,
  setTotalCountUsers,
  toggleIsFetching,
  toggleFollowingProgress,
  getUsersThunkCreator,
  unFollowThunkCreator,
  followThunckCreator,
}

// let UsersContainer = withAuthRedirect(
//   connect(mapStateToProps, mapDispatchToProps)(UsersAPIContainer));

let UsersContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect)(UsersAPIContainer);



export default UsersContainer;