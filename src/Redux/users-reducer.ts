import { Dispatch } from "redux";
// import { ActionTypes } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { SetUserAuthenticationData } from "./authentication-reducer";
import { loggedAction } from "./logers/loger-reducers";
import { AppStateType, InferActionTypes } from "./redux-store";



const initialState = {
  users: [
    { id: 1, followed: true, name: "Dmitry Yakovlev", status: "here i'm", location: { city: "Minsk", country: "Belarus", }, photos: { small: "", large: "", }, },
    { id: 2, followed: false, name: "Mikolo Petrenko", status: "lerning", location: { city: "Kiev", country: "Ukrain", photos: { small: "", large: "", }, }, },
    { id: 3, followed: true, name: "Sasha Soldatova", status: "travel", location: { city: "Novosibirsk", country: "Russia", photos: { small: "", large: "", }, }, },
  ] as Array<UserType>,
  pageSize: 50 as number,
  totalUsersCount: 1112 as number,
  currentPageNumb: 1 as number,
  isFetching: false as boolean,
  followingInProgress: [] as Array<number>, // array of users id
}

export type InitialState = typeof initialState;
const usersReducer = function (state = initialState, action: CombinedActionTypes): InitialState {
  const a = action;
  switch (action.type) {
    case "FOLLOW": {
      let stateCopy = {
        ...state,
        users: state.users.map(function (user) {
          if (user.id == action.userId) return { ...user, followed: true, };
          else return { ...user };
        })
      };
      return stateCopy;
    }
    case "UNFOLLOW": {
      let stateCopy = {
        ...state,
        users: state.users.map(function (user) {
          if (user.id == action.userId) return { ...user, followed: false, };
          else return { ...user };
        })
      };
      return stateCopy;
    }
    case "SET_USERS": {
      return { ...state, users: [...action.users], };
    }
    case "SET_CURRENT_PAGE_NUMB": {
      let temp = { ...state, currentPageNumb: action.currentPageNumb, };
      return temp;
    }
    case "SET_TOTAL_COUNT_USERS": {
      return { ...state, totalUsersCount: action.count, }
    }
    case "TOGGLE_IS_FETCHING": {
      return { ...state, isFetching: action.isFetching, }
    }
    case "TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state,
        // isFetching: action.isFetching,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id != action.userId),
      }
    }

    default:
      loggedAction(a.type, "usersReduser", false);
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
export type SetUsers = { type: typeof SET_USERS, users: Array<UserType>, };
type SetCurrentPageNumb = { type: typeof SET_CURRENT_PAGE_NUMB, currentPageNumb: number, };
type SetTotalCountUsers = { type: typeof SET_TOTAL_COUNT_USERS, count: number, };
type ToggleIsFetching = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean, };
type ToggleFollowingProgress = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number, };

type CombinedActionTypes_Old = Follow | Unfollow | SetUsers | SetCurrentPageNumb
  | SetTotalCountUsers | ToggleIsFetching | ToggleFollowingProgress;

type CombinedActionTypes = InferActionTypes<typeof actionsOfUsers>;
export const actionsOfUsers = {
  follow,
  unFollow,
  setUsers,
  setCurrentPageNumb,
  setTotalCountUsers,
  toggleIsFetching,
  toggleFollowingProgress,
}

export function follow(userId: number) { return { type: "FOLLOW", userId: userId, } as const };
export function unFollow(userId: number) { return { type: "UNFOLLOW", userId: userId, } as const };
export function setUsers(users: Array<UserType>) { return { type: "SET_USERS", users: users, } as const };
export function setCurrentPageNumb(numb: number) { return { type: "SET_CURRENT_PAGE_NUMB", currentPageNumb: numb, } as const };
export function setTotalCountUsers(count: number) { return { type: "SET_TOTAL_COUNT_USERS", count, } as const };
export function toggleIsFetching(isFetching: boolean) { return { type: "TOGGLE_IS_FETCHING", isFetching, } as const };
export function toggleFollowingProgress(isFetching: boolean, userId: number) { return { type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const };



type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, CombinedActionTypes>;

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch: Dispatch<CombinedActionTypes>, getState: () => AppStateType) => {  // some variant typeing thunks
    dispatch(actionsOfUsers.toggleIsFetching(true));
    dispatch(actionsOfUsers.setCurrentPageNumb(currentPage));

    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(actionsOfUsers.setUsers(data.items));
    dispatch(actionsOfUsers.setTotalCountUsers(data.totalCount));  // large count users
    dispatch(actionsOfUsers.toggleIsFetching(false));
  }
}

export const followThunckCreator = (userId: number): ThunkType => {  // type from redux for thunks
  return _handlerFollow(userId, true);
}

export const unFollowThunkCreator = (userId: number): ThunkType => {
  return _handlerFollow(userId, false);
}

function _handlerFollow(userId: number, isFollowState: boolean): ThunkType { // ?????????
  return async (dispatch) => {
    dispatch(actionsOfUsers.toggleFollowingProgress(true, userId));

    let response;
    if (isFollowState) response = await usersAPI.follow(userId);
    else response = await usersAPI.unFollow(userId);

    if (response.data.resultCode == 0) {
      dispatch(isFollowState ? actionsOfUsers.follow(userId) : actionsOfUsers.unFollow(userId));
      dispatch(actionsOfUsers.toggleFollowingProgress(false, userId));
    }
  }
}


export default usersReducer;