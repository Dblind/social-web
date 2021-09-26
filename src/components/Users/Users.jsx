import React from "react"
import css from './Users.module.css';
import follower from './follower.jpg';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { usersAPI } from "../../api/api";
import { toggleFollowingProgress, unFollowThunkCreator } from "../../Redux/users-reducer";


const Users = function (props) {
  console.log("users props", props);

  let pageSwitcher = <PageSwitcher
    currentPage={props.currentPage}
    totalUsersCount={props.totalUsersCount}
    pageSize={props.pageSize}
    onGetUsersFromServer={props.onGetUsersFromServer}
  />;

  return (

    <div className={css.container}>

      {pageSwitcher}
      {/* <PageSwitcher totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} a1={props.a1} /> */}

      <div className={css.blockContainer}>
        {
          props.users.map(user =>
            <UserBlock
              onFollow={props.onFollow}
              onUnfollow={props.onUnfollow}
              toggleFollowingProgress={props.toggleFollowingProgress}
              followingInProgress={props.followingInProgress}
              unFollowThunkCreator={props.unFollowThunkCreator}
              followThunckCreator={props.followThunckCreator}
              user={user} />)
        }
      </div>

      {pageSwitcher}

    </div >
  )
}


function updatePage(pageNumb) {
  this.props.onGetUsersFromServer(pageNumb);
  this.aaa();
}

const PageSwitcher = function (props) {
  let pagesCount = Math.ceil(props.totalUsersCount / (props.pageSize > 0 ? props.pageSize : 1));
  let switchButtons = Array(pagesCount);
  for (let i = 0; i < switchButtons.length; i++) {
    let button = new pagesNavButton(i + 1, props.onGetUsersFromServer);
    switchButtons[i] = button.render(i + 1 == props.currentPage ? { selector: css.switchPages__selected } : {});
  }
  return <div className={css.pageSwitcher}>{switchButtons}</div>;
}


class pagesNavButton {
  constructor(currentPage, callback) {
    this.number = currentPage;
    this.callback = callback;
  }

  render(classNames) {
    // debugger
    return <button className={classNames.selector} onClick={() => this.callback(this.number)}>
      {this.number}
    </button>
  }
}

function WaitResponse(props) {
  console.log("wait response", props.userId, props.followingInProgress);
  if (props.followingInProgress)
    return (
      <div>
        wait response
      </div>
    )
  else return <div>done</div>
}

class UserBlock extends React.Component {
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

                  /*
                  // old version for asersAPI
                  this.props.toggleFollowingProgress(true, this.props.user.id);
                  usersAPI.unFollow(this.props.user.id)
                    .then(data => { if (data.data.resultCode == 0) {
                      this.props.onUnfollow(this.props.user.id) ;
                      this.props.toggleFollowingProgress(false, this.props.user.id);
                      } });
                  */

                  // old version without axios.create()

                  // this.props.toggleFollowingProgress(true, this.props.user.id);
                  // axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${this.props.user.id}`,
                  //   {
                  //     withCredentials: true,
                  //     headers: { "API-KEY": "d0d8fea3-e35d-4a5d-8b18-bc86cf9e55b5", }
                  //   })
                  //   .then((response) => {
                  //     this.props.toggleFollowingProgress(false, this.props.user.id);
                  //     if (response.data.resultCode == 0) {
                  //       this.props.onUnfollow(this.props.user.id);
                  //     }
                  //   });
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
            userId={this.props.user.id}
            />
        </div>
        <div className={css.block__info}>
          <div className="block__name">
            <ul>
              <li><span>{this.props.user.id}: {this.props.user.fullName || this.props.user.name}</span></li>
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