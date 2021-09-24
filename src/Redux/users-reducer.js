

const initialState = {
  users: [
    { id: 1, followed: true, fullName: "Dmitry Yakovlev", status: "here i'm", location: { city: "Minsk", country: "Belarus", }, },
    { id: 2, followed: false, fullName: "Mikolo Petrenko", status: "lerning", location: { city: "Kiev", country: "Ukrain", }, },
    { id: 3, followed: true, fullName: "Sasha Soldatova", status: "travel", location: { city: "Novosibirsk", country: "Russia", }, },
  ],
  pageSize: 50,
  totalUsersCount: 1112,
  currentPageNumb: 1,
  isFetching: false,
}

const usersReducer = function (state = initialState, action) {
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
      let temp = { ...state, currentPageNumb: action.currentPageNumb,};
      return  temp;
    }
    case SET_TOTAL_COUNT_USERS: {
      return { ...state, totalUsersCount: action.count, }
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching, }
    }

    default:
      console.log("Incorrect dispatch action type! type:\"" + action.type + "\".");
      return state;
  }
}

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE_NUMB = "SET-CURRENT-PAGE-NUMB";
const SET_TOTAL_COUNT_USERS = "SET-TOTAL-COUNT-USERS";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";

export function follow(userId) { return { type: FOLLOW, userId: userId, } };
export function unFollow(userId) { return { type: UNFOLLOW, userId: userId, } };
export function setUsers(users) { return { type: SET_USERS, users: users, } };
export function setCurrentPageNumb(numb) { return { type: SET_CURRENT_PAGE_NUMB, currentPageNumb: numb, } };
export function setTotalCountUsers(count) { return { type: SET_TOTAL_COUNT_USERS, count, } };
export function toggleIsFetching(isFetching) { return { type: TOGGLE_IS_FETCHING, isFetching, } };

export default usersReducer;