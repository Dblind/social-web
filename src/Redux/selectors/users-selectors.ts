import { createSelector } from "reselect"
import { AppStateType } from "../redux-store"



function getPageSize(state: AppStateType) { return state.usersPage.pageSize }
function getTotalUsersCount(state: AppStateType) { return state.usersPage.totalUsersCount }
function getCurrentPageNumb(state: AppStateType) { return state.usersPage.currentPageNumb }
function getIsFetching(state: AppStateType) { return state.usersPage.isFetching }
function getFollowingInProgress(state: AppStateType) { return state.usersPage.followingInProgress }


function pullUsers(state: AppStateType) { return state.usersPage.users }
const getUsers = createSelector(pullUsers, (users) => {
  return users.filter(u => true);
})




let usersSelectors = {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPageNumb,
  getIsFetching,
  getFollowingInProgress,
}

export default usersSelectors;