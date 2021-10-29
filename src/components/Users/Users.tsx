import React, { useEffect } from "react"
import css from './Users.module.css';
import follower from './follower.jpg';
import { NavLink, useHistory, withRouter } from "react-router-dom";
import PageSwitcher from "../common/PageSwitcher/PageSwitcher";

import { UserType } from '../../types/types';
import SearchUsersForm from "./Forms/SearchUsersForm";
import { followThunckCreator, getUsersThunkCreator, TypeFilter, unFollowThunkCreator } from "../../Redux/users-reducer";
import { useDispatch, useSelector, useStore } from "react-redux";
import usersSelectors from "../../Redux/selectors/users-selectors";
import * as queryString from 'querystring';

type PropsType = {
  // users: Array<UserType>,
  // onFollow: any,
  // onUnfollow: any,
  // followingInProgress: any,
  // unFollowThunkCreator: any,
  // followThunckCreator: any,
  // onGetUsersFromServer: (page: number, filter?:TypeFilter) => void,
  // toggleFollowingProgress: (isFetching: boolean, userId: number) => void,
  // onFilterChanged: (filter: TypeFilter) => void,
}

const Users: React.FC<PropsType> = function (props) {
  const users = useSelector(usersSelectors.getUsers);
  const totalUsersCount = useSelector(usersSelectors.getTotalUsersCount);
  const currentPage = useSelector(usersSelectors.getCurrentPageNumb);
  const pageSize = useSelector(usersSelectors.getPageSize);
  const usersFilter = useSelector(usersSelectors.getFilter);
  const followingInProgress = useSelector(usersSelectors.getFollowingInProgress);

  const dispatch = useDispatch();
  const history = useHistory();

  type TQueryParamsType = { term?: string, page?: string, friend?: string, };
  useEffect(() => {
    console.log("mount");
    const search = history.location.search.substring(1);
    const parsed = queryString.parse(search) as TQueryParamsType;
    
    let actualPage = currentPage;
    let actualFilter = usersFilter;
    
    if(parsed.page) actualPage = Number(parsed.page);
    if(parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string, };
    if(parsed.friend) actualFilter = { ...actualFilter, friend: parsed.friend == "null" ? null : parsed.friend == "true" ? true : false, };
    
    dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter));
    // onGetUsersFromServer(1, usersFilter);
  }, []);

  useEffect(() => {
    console.log("history");

    const query: TQueryParamsType = {};
    if(!!usersFilter.term) query.term = usersFilter.term;
    if(!!usersFilter.friend !== null) query.friend = String(usersFilter.friend);
    if(currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: "/users",
      // ?term=&friend=null&page=1
      search: queryString.stringify(query),//`?term=${usersFilter.term}&friend=${usersFilter.friend}&page=${currentPage}`,
    })
  }, [usersFilter, currentPage]);


  const onGetUsersFromServer = (page: number, filter: TypeFilter = usersFilter) => {
    dispatch(getUsersThunkCreator(page, pageSize, filter));
    console.log("app mount");

  }
  const onFilterChanged = (filter: TypeFilter) => {
    dispatch(getUsersThunkCreator(currentPage, pageSize, filter));
  }
  const follow = (userId: number) => {
    dispatch(followThunckCreator(userId));
  }
  const unFollow = (userId: number) => {
    dispatch(unFollowThunkCreator(userId));
  }


  let PageSwitcherComponent = <PageSwitcher
    currentPage={currentPage}
    totalItemsCount={totalUsersCount}
    pageSize={pageSize}
    onGetUsersFromServer={onGetUsersFromServer}
    pagesInBlock={10}
  />

  return (

    <div className={css.container}>
      <SearchUsersForm onFilterChanged={onFilterChanged} />
      <hr />
      {PageSwitcherComponent}
      {/* {pageSwitcherAll} */}
      {/* <PageSwitcher totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} a1={props.a1} /> */}

      <div className={css.blockContainer}>
        {
          users.map(user =>
            <UserBlock
              key={user.id.toString() + user.name}
              // onFollow={props.onFollow}
              // onUnfollow={props.onUnfollow}
              // toggleFollowingProgress={props.toggleFollowingProgress}
              followingInProgress={followingInProgress}
              follow={follow}
              unFollow={unFollow}
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
  follow: (userId: number) => void,
  unFollow: (userId: number) => void,
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

                    this.props.unFollow(this.props.user.id);


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
                    this.props.follow(this.props.user.id);

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




export default Users