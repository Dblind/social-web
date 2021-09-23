import React from "react"
import css from './Users.module.css';
import follower from './follower.jpg';
import axios from "axios";


class Users extends React.Component {
  constructor(props) {
    super(props);
    // this.onGetUsersFromServer();
    // this.onGetUsersFromServer();
    this.updatePage = this.updatePage.bind(this);
  }

  componentDidMount() {
    this.onGetUsersFromServer(1);

    this.aaa();

    // let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    // this.a = Array(pagesCount);
    // for (let i = 0; i < this.a.length; i++) {
    //   let button = new pagesNavButton(i + 1, this.updatePage);
    //   this.a[i] = button.render();


    // let temp = i + 1;
    // if (this.props.currentPageNumb == temp) temp = <button value={temp} className={css.switchPages__selected}>{temp}</button>
    // else temp = <button value={temp} >{temp}</button>
    // this.a[i] = temp;
    // console.log("temp", this.props, this.a);
    // temp = 0;

    // let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    // this.a = Array(pagesCount);
    // for (let i = 0; i < this.a.length; i++) {
    //   let temp = i + 1 + " ";
    //   if (this.props.currentPageNumb == temp)
    //     temp = <span className={css.switchPages__selected}>{`[${temp}]`}</span>;
    //   temp = <span>{temp}</span>;
    //   this.a[i] = temp;
    //   console.log("temp", this.props, this.a);
    //   // temp = 0;
    // }

  }

  aaa() {
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    this.a = Array(pagesCount);
    for (let i = 0; i < this.a.length; i++) {
      let button = new pagesNavButton(i + 1, this.updatePage);
      this.a[i] = button.render();
    }
  }

  updatePage(currentPage) {
    this.props.setCurrentPageNumb(currentPage);
    console.log("this.props", this.props);
    this.onGetUsersFromServer(currentPage);
  }



  // https://social-network.samuraijs.com/
  onGetUsersFromServer(page) {
    console.log("get users");
    let propsLink = this.props;

    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
      // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page${this.props.currentPageNumb}&count${this.props.pageSize}`)
      .then(response => {
        this.props.setUsers(response.data.items);
        // this.props.setTotalCountUsers(response.data.totalCount);

      });
      
      this.aaa();
    // console.log('axios', `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPageNumb}&count=${this.props.pageSize}`)
  }

  render() {

    console.log("render props", this.props);

    // if (this.props.users.length < 22) {
    //   console.log("use");
    //   this.props.setUsers(
    //     [
    //       { id: 11, followed: true, fullName: "Dmitry Yakovlev", status: "here i'm", location: { city: "Minsk", country: "Belarus", }, },
    //       { id: 12, followed: false, fullName: "Mikolo Petrenko", status: "lerning", location: { city: "Kiev", country: "Ukrain", }, },
    //       { id: 13, followed: true, fullName: "Sasha Soldatova", status: "travel", location: { city: "Novosibirsk", country: "Russia", }, },
    //     ]
    //   );
    // }


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
            <BlockUser
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
    // super(currentPage, countPage);
    this.number = currentPage;
    this.callback = callback;
  }

  render() {
    return <button onClick={() => this.callback(this.number)}>
      {this.number}
    </button>
  }
}


class BlockUser extends React.Component {
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

const Users2 = (props) => {
  return <div>
    USERS WILL BE HERE
  </div>
}

export default Users;