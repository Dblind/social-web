import { createSelector } from "reselect"



function getPageSize(state) { return state.usersPage.pageSize }
function getTotalUsersCount(state) { return state.usersPage.totalUsersCount }
function getCurrentPageNumb(state) { return state.usersPage.currentPageNumb }
function getIsFetching(state) { return state.usersPage.isFetching }
function getFollowingInProgress(state) { return state.usersPage.followingInProgress }


function pullUsers(state) { return state.usersPage.users }
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