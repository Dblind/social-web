import React from "react";
import Users from "./Users";
// import Users from "./UsersCopy2";
import axios from "axios";


//  old code requests users from server

/*
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

    axios.get(
      `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
      // `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPageNumb}&count=${this.props.pageSize}`)
      .then(responce => {
        this.props.setUsers(responce.data.items);
        // this.props.setTotalCountUsers(responce.data.totalCount);

      });
    // console.log('axios', `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPageNumb}&count=${this.props.pageSize}`)
  }


  render () {
    return (
      <Users 
      totalUsersCount={this.props.totalUsersCount}
              pageSize={this.props.pageSize}
              currentPage={this.props.currentPage}
              users={this.props.users}
              onFollow={this.props.follow}
              onUnfollow={this.props.unfollow}
              onGetUsersFromServer={this.onGetUsersFromServer}
              a2={2}
      />
    )
  }
}


export default UsersAPIContainer;

*/