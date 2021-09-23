import React from "react"
import { connect } from "react-redux";
import {
  followActionCreater, setCurrentPageNumbActionCreater, toggleIsFetchingActionCreater,
  setTotalCountUsersActionCreater, setUsersActionCreater, unFollowActionCreater
} from "../../Redux/users-reducer";
// import UsersAPIContainer from "./Users";
// import UsersAPIContainer from "./UsersAPIContainer";
import Users from "./Users";
import axios from "axios";

import preloader from './1487.gif';
import css from './Users.module.css';
import Preloader from "../common/Preloader/Preloader";

class UsersAPIContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onGetUsersFromServer(1);
  }


  // https://social-network.samuraijs.com/
  onGetUsersFromServer = (page) => {
    console.log("get users");
    let propsLink = this.props;

    this.props.setCurrentPageNumb(page);
    this.props.toggleIsFetching(true);

    axios.get(
      `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
      // `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPageNumb}&count=${this.props.pageSize}`)
      .then(responce => {
        this.props.setUsers(responce.data.items);
        this.props.toggleIsFetching(false);

        // this.props.setTotalCountUsers(responce.data.totalCount);

      });
    // console.log('axios', `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPageNumb}&count=${this.props.pageSize}`)
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
        onUnfollow={this.props.unfollow}
        onGetUsersFromServer={this.onGetUsersFromServer}
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
  }
}
function mapDispatchToProps_old(dispatch) {
  return {
    onFollow(userId) {
      dispatch(followActionCreater(userId));
    },
    onUnfollow(userId) {
      dispatch(unFollowActionCreater(userId));
    },
    setUsers: function (users) {
      dispatch(setUsersActionCreater(users));
    },
    setCurrentPageNumb(numb) {
      dispatch(setCurrentPageNumbActionCreater(numb));
    },
    setTotalCountUsers(count) {
      dispatch(setTotalCountUsersActionCreater(count));
    },
    toggleIsFetching(isFetching) {
      dispatch(toggleIsFetchingActionCreater(isFetching));
    },
  }
}

const mapDispatchToProps = {
  onFollow: followActionCreater,
  unfollow: unFollowActionCreater,
  setUsers: setUsersActionCreater,
  setCurrentPageNumb: setCurrentPageNumbActionCreater,
  setTotalCountUsers: setTotalCountUsersActionCreater,
  toggleIsFetching: toggleIsFetchingActionCreater,
}

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIContainer);



export default UsersContainer;