import React from "react"
import css from './Users.module.css';
import follower from './follower.jpg';
import axios from "axios";


class Users extends React.Component {
  constructor(props) {
    super(props);
    // this.onGetUsersFromServer();
    // this.onGetUsersFromServer();
    console.log("updatePage", this.props);
    this.updatePage = this.updatePage.bind(this);
    this.pageSwitcher();
  }

  updatePage(pageNumb) {
    this.props.onGetUsersFromServer(pageNumb);
    this.pageSwitcher();
  }

  pageSwitcher() {
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    this.a = Array(pagesCount);
    for (let i = 0; i < this.a.length; i++) {
      let button = new pagesNavButton(i + 1, (n) => this.updatePage(n));
      this.a[i] = button.render();
    }
  }

  

  render() {

    return (

      <div className={css.container}>
        <div className={css.switchPages}>
          {this.a}
        </div>
        <div>
          <button className={css.users__button} onClick={() => { this.onGetUsersFromServer() }}>get users</button>
          <input type="text" name="numb page" id="np"
            onChange={(event) => this.props.setCurrentPageNumb(event.target.value)} />
        </div>

        {
          this.props.users.map(user =>
            <UserBlock
              onFollow={this.props.onFollow}
              onUnfollow={this.props.onUnfollow}
              user={user} />)
        }
        <div className={css.switchPages}>
          {this.a}
        </div>
      </div >
    )
  }
}

class pagesNavButton {
  constructor(currentPage, callback) {
    // super();
    // super(currentPage, countPage);
    this.number = currentPage;
    this.callback = callback;
  }

  render() {
    // debugger
    return <button onClick={() => this.callback(this.number)}>
      {this.number}
    </button>
  }
}


class UserBlock extends React.Component {
  render() {
    return (
      <div className={css.block}>
        <div className={css.block__follow}>
          <div className={css.block__avatar}><img src={this.props.user.photos?.large || this.props.user.photos?.small || follower} alt="" /></div>
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