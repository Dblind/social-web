import React from "react"
import { connect } from "react-redux";
import {
  follow, setCurrentPageNumb, toggleIsFetching,
  setTotalCountUsers, setUsers, unFollow, 
  toggleFollowingProgress, getUsersThunkCreator, unFollowThunkCreator, followThunckCreator
} from "../../Redux/users-reducer";
import Users from "./Users";
import axios from "axios";

import Preloader from "../common/Preloader/Preloader";
import { getUsers, usersAPI } from "../../api/api";


class UsersAPIContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onGetUsersFromServer(1);
  }


  // https://social-network.samuraijs.com/
  onGetUsersFromServer = (page) => {
    this.props.setCurrentPageNumb(page);

    this.props.getUsersThunkCreator(page, this.props.pageSize);

    /* this.props.toggleIsFetching(true);
    usersAPI.getUsers(page, this.props.pageSize)
    // axios.get(
    //   // `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPageNumb}&count=${this.props.pageSize}`)
    //   `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`,
    //   { withCredentials: true, })
      .then(data => {
        this.props.setUsers(data.items);
        this.props.toggleIsFetching(false);
        // this.props.setTotalCountUsers(response.data.totalCount);  // large count users
      }); */
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

function mapStateToProps(state) {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPageNumb: state.usersPage.currentPageNumb,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
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

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIContainer);



export default UsersContainer;