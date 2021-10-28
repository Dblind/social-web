import React from "react"
import css from './Users.module.css';
import follower from './follower.jpg';
import { NavLink } from "react-router-dom";
import PageSwitcher from "../common/PageSwitcher/PageSwitcher";

import { UserType } from '../../types/types';
import SearchUsersForm from "./Forms/SearchUsersForm";
import { TypeFilter } from "../../Redux/users-reducer";

type PropsType = {
  currentPage: number,
  totalUsersCount: number,
  pageSize: number,
  users: Array<UserType>,
  onFollow: any,
  onUnfollow: any,
  followingInProgress: any,
  unFollowThunkCreator: any,
  followThunckCreator: any,
  onGetUsersFromServer: (page: number, filter?:TypeFilter) => void,
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void,
  onFilterChanged: (filter: TypeFilter) => void,
}

const Users: React.FC<PropsType> = function (props) {

  let PageSwitcherComponent = <PageSwitcher
    currentPage={props.currentPage}
    totalItemsCount={props.totalUsersCount}
    pageSize={props.pageSize}
    onGetUsersFromServer={props.onGetUsersFromServer}
    pagesInBlock={10}
  />

  return (

    <div className={css.container}>
      <SearchUsersForm onFilterChanged={props.onFilterChanged} />
      <hr />
      {PageSwitcherComponent}
      {/* {pageSwitcherAll} */}
      {/* <PageSwitcher totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} a1={props.a1} /> */}

      <div className={css.blockContainer}>
        {
          props.users.map(user =>
            <UserBlock
              key={user.id.toString() + user.name}
              // onFollow={props.onFollow}
              // onUnfollow={props.onUnfollow}
              // toggleFollowingProgress={props.toggleFollowingProgress}
              followingInProgress={props.followingInProgress}
              unFollowThunkCreator={props.unFollowThunkCreator}
              followThunckCreator={props.followThunckCreator}
              user={user} />)
        }
      </div>

      {/* {pageSwitcherAll} */}
      {PageSwitcherComponent}
    </div >
  )
}


type WaitResponseTypeProps = {
  followingInProgress: boolean,
}
const WaitResponse: React.FC<WaitResponseTypeProps> = ({ followingInProgress }) => {
  // console.log("wait response", props.userId, props.followingInProgress);
  if (followingInProgress)
    return (
      <div>
        wait response
      </div>
    )
  else return <div>done</div>
}

type UserBlockType = {
  followingInProgress: number[],
  user: UserType,
  unFollowThunkCreator: (userId: number) => void,
  followThunckCreator: (userId: number) => void,
}
class UserBlock extends React.Component<UserBlockType> {
  render() {
    // debugger
    let inProgress = this.props.followingInProgress.some(id => id == this.props.user.id);

    return (
      <div className={css.block}>
        <div className={css.block__follow}>
          <div className={css.block__avatar}>
            <NavLink to={"/profile/" + this.props.user.id}>
              <img src={this.props.user.photos?.large || this.props.user.photos?.small || follower} alt="user photo" />
            </NavLink>
          </div>
          {
            this.props.user.followed
              ?
              <>
                <button disabled={inProgress}
                  className={css.block__btnUnFollow}
                  onClick={(event) => {
                    // debugger
                    console.log("followingInProgress", this.props.followingInProgress);
                    if (inProgress) return;

                    this.props.unFollowThunkCreator(this.props.user.id);


                  }}>
                  unfollow
                </button>
                {/* <WaitResponse followingInProgress={inProgress} /> */}
              </>
              :
              <>
                <button disabled={inProgress}
                  className="block__btnFollow"
                  onClick={(event) => {
                    if (inProgress) return;
                    this.props.followThunckCreator(this.props.user.id);

                  }}>
                  follow
                </button>
              </>
          }
          <WaitResponse
            followingInProgress={inProgress}
          // userId={this.props.user.id}
          />
        </div>
        <div className={css.block__info}>
          <div className="block__name">
            <ul>
              <li><span>{this.props.user.id}: {this.props.user.name}</span></li>
              <li><span>{this.props.user.status}</span></li>
            </ul>
          </div>
          <div className="block__location">
            <ul>
              <li><span>{this.props.user.location?.city ?? "empty city"}</span></li>
              <li><span>{this.props.user.location?.country ?? "empty country"}</span></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}




export default Users;