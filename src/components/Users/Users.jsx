import React from "react"
import css from './Users.module.css';
import follower from './follower.jpg';
import axios from "axios";
import { NavLink } from "react-router-dom";


const Users = function (props) {
  let pageSwitcher = <PageSwitcher
    currentPage={props.currentPage}
    totalUsersCount={props.totalUsersCount}
    pageSize={props.pageSize}
    onGetUsersFromServer={props.onGetUsersFromServer}
  />;

  console.log("props", props);
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
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let a = Array(pagesCount);
  for (let i = 0; i < a.length; i++) {
    let button = new pagesNavButton(i + 1, props.onGetUsersFromServer);
    a[i] = button.render(i + 1 == props.currentPage ? { selector: css.switchPages__selected } : {});
  }
  return <div className={css.pageSwitcher}>{a}</div>;
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


class UserBlock extends React.Component {
  render() {
    return (
      <div className={css.block}>
        <div className={css.block__follow}>
          <div className={css.block__avatar}>
            <NavLink to={"/profile/" + this.props.user.id}>
              <img src={this.props.user.photos?.large || this.props.user.photos?.small || follower} alt="" />
            </NavLink>
          </div>
          {this.props.user.followed ?
            <button
              className="block__btnFollow"
              onClick={(event) => this.props.onUnfollow(this.props.user.id)}>unfollow
            </button> :
            <button
              className="block__btnFollow"
              onClick={(event) => this.props.onFollow(this.props.user.id)} >follow
            </button>}
        </div>
        <div className={css.block__info}>
          <div className="block__name">
            <span>{this.props.user.id}: {this.props.user.fullName || this.props.user.name}</span>
            <span>{this.props.user.status}</span>
          </div>
          <div className="block__location">
            <span>{this.props.user.location?.city ?? "empty city"}</span>
            <span>{this.props.user.location?.country ?? "empty country"}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Users;