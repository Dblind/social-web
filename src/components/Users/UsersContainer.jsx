import React from "react"
import { connect } from "react-redux";
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


class UsersAPIContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onGetUsersFromServer(1);
  }


  // https://social-network.samuraijs.com/
  onGetUsersFromServer = (page) => {
    this.props.getUsersThunkCreator(page, this.props.pageSize);
}


  render() {
    return (<>
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
        a2={2}
      />
    </>
    )
  }
}

// let withRedirectUsersContainer = withAuthRedirect(UsersAPIContainer);

function mapStateToProps(state) {
  return {
    users: usersSelectors.getUsers(state),
    pageSize: usersSelectors.getPageSize(state),
    totalUsersCount: usersSelectors.getTotalUsersCount(state),
    currentPageNumb: usersSelectors.getCurrentPageNumb(state),
    isFetching: usersSelectors.getIsFetching(state),
    followingInProgress: usersSelectors.getFollowingInProgress(state),
  }
}
function mapDispatchToProps_old(dispatch) {
  return {
    onFollow(userId) {
      dispatch(follow(userId));
    },
    onUnfollow(userId) {
      dispatch(unFollow(userId));
    },
    setUsers: function (users) {
      dispatch(setUsers(users));
    },
    setCurrentPageNumb(numb) {
      dispatch(setCurrentPageNumb(numb));
    },
    setTotalCountUsers(count) {
      dispatch(setTotalCountUsers(count));
    },
    toggleIsFetching(isFetching) {
      dispatch(toggleIsFetching(isFetching));
    },
  }
}

const mapDispatchToProps = {
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