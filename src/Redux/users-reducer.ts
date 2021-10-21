import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { SetUserAuthenticationData } from "./authentication-reducer";
import { loggedAction } from "./logers/loger-reducers";



const initialState = {
  users: [
    { id: 1, followed: true, name: "Dmitry Yakovlev", status: "here i'm", location: { city: "Minsk", country: "Belarus", }, photos: {small: "", large: "", }, },
    { id: 2, followed: false, name: "Mikolo Petrenko", status: "lerning", location: { city: "Kiev", country: "Ukrain", photos: {small: "", large: "", }, }, },
    { id: 3, followed: true, name: "Sasha Soldatova", status: "travel", location: { city: "Novosibirsk", country: "Russia", photos: {small: "", large: "", }, }, },
  ] as Array<UserType>,
  pageSize: 50 as number,
  totalUsersCount: 1112 as number,
  currentPageNumb: 1 as number,
  isFetching: false as boolean,
  followingInProgress: [] as Array<number>, // array of users id
}

export type InitialState = typeof initialState;
const usersReducer = function (state = initialState, action: any): InitialState {
  switch (action.type) {
    case FOLLOW: {
      let stateCopy = {
        ...state,
        users: state.users.map(function (user) {
          if (user.id == action.userId) return { ...user, followed: true, };
          else return { ...user };
        })
      };
      return stateCopy;
    }
    case UNFOLLOW: {
      let stateCopy = {
        ...state,
        users: state.users.map(function (user) {
          if (user.id == action.userId) return { ...user, followed: false, };
          else return { ...user };
        })
      };
      return stateCopy;
    }
    case SET_USERS: {
      return { ...state, users: [...action.users], };
    }
    case SET_CURRENT_PAGE_NUMB: {
      let temp = { ...state, currentPageNumb: action.currentPageNumb, };
      return temp;
    }
    case SET_TOTAL_COUNT_USERS: {
      return { ...state, totalUsersCount: action.count, }
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching, }
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        // isFetching: action.isFetching,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id != action.userId),
      }
    }

    default:
      loggedAction(action.type, "usersReduser", false);
      return state;
  }
}

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE_NUMB = "SET-CURRENT-PAGE-NUMB";
const SET_TOTAL_COUNT_USERS = "SET-TOTAL-COUNT-USERS";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";  // processing request for get users
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS"; // processing request for follow

type Follow = { type: typeof FOLLOW, userId: number, };
type Unfollow = { type: typeof UNFOLLOW, userId: number, };
type SetUsers = { type: typeof SET_USERS, users: Array<UserType>, };
type SetCurrentPageNumb = { type: typeof SET_CURRENT_PAGE_NUMB, currentPageNumb: number, };
type SetTotalCountUsers = { type: typeof SET_TOTAL_COUNT_USERS, count: number, };
type ToggleIsFetching = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean, };
type ToggleFollowingProgress = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number, };

export function follow(userId: number): Follow { return { type: FOLLOW, userId: userId, } };
export function unFollow(userId: number): Unfollow { return { type: UNFOLLOW, userId: userId, } };
export function setUsers(users: Array<UserType>): SetUsers { return { type: SET_USERS, users: users, } };
export function setCurrentPageNumb(numb: number): SetCurrentPageNumb { return { type: SET_CURRENT_PAGE_NUMB, currentPageNumb: numb, } };
export function setTotalCountUsers(count: number): SetTotalCountUsers { return { type: SET_TOTAL_COUNT_USERS, count, } };
export function toggleIsFetching(isFetching: boolean): ToggleIsFetching { return { type: TOGGLE_IS_FETCHING, isFetching, } };
export function toggleFollowingProgress(isFetching: boolean, userId: number): ToggleFollowingProgress { return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId } };


export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: any) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPageNumb(currentPage));

  let data = await usersAPI.getUsers(currentPage, pageSize);

  dispatch(setUsers(data.items));
  dispatch(setTotalCountUsers(data.totalCount));  // large count users
  dispatch(toggleIsFetching(false));
}

function followHandler(userId: number, isFollowState: boolean) {
  return async (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));

    let response;
    if (isFollowState) response = await usersAPI.follow(userId);
    else response = await usersAPI.unFollow(userId);

    if (response.data.resultCode == 0) {
      dispatch(isFollowState ? follow(userId) : unFollow(userId));
      dispatch(toggleFollowingProgress(false, userId));
    }
  }
}

export const unFollowThunkCreator = (userId: number) => {
  return followHandler(userId, false);
  // return async dispatch => {
  //   dispatch(toggleFollowingProgress(true, userId));
  //   let response = await usersAPI.unFollow(userId);
  //   if (response.data.resultCode == 0) {
  //     dispatch(unFollow(userId));
  //     dispatch(toggleFollowingProgress(false, userId));
  //   }
  // }
}

export const followThunckCreator = (userId: number) => {
  return followHandler(userId, true);

  // return async dispatch => {
  //   dispatch(toggleFollowingProgress(true, userId));
  //   let data = await usersAPI.follow(userId)
  //   if (data.resultCode == 0) {
  //     dispatch(follow(userId));
  //     dispatch(toggleFollowingProgress(false, userId));
  //   }

  // }
}

export default usersReducer;