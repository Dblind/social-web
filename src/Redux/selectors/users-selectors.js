


function getUsers(state) { return state.usersPage.users }
function getPageSize(state) { return state.usersPage.pageSize }
function getTotalUsersCount(state) { return state.usersPage.totalUsersCount }
function getCurrentPageNumb(state) { return state.usersPage.currentPageNumb }
function getIsFetching(state) { return state.usersPage.isFetching }
function getFollowingInProgress(state) { return state.usersPage.followingInProgress }




let usersSelectors = {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPageNumb,
  getIsFetching,
  getFollowingInProgress,
}

export default usersSelectors;