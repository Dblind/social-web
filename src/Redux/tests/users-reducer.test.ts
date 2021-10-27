import { UserType } from "../../types/types";
import usersReducer, { actionsOfUsers, InitialState } from "../users-reducer";

let state: InitialState;

beforeEach(() => {
  state = {
    users: [
      { id: 1, followed: false, name: "Dmitry Yakovlev", status: "here i'm", location: { city: "Minsk", country: "Belarus", }, photos: { small: "", large: "", }, },
      { id: 2, followed: false, name: "Mikolo Petrenko", status: "lerning", location: { city: "Kiev", country: "Ukrain", photos: { small: "", large: "", }, }, },
      { id: 3, followed: true, name: "Sasha Soldatova", status: "travel", location: { city: "Novosibirsk", country: "Russia", photos: { small: "", large: "", }, }, },
      { id: 0, followed: true, name: "Test Text", status: "tEsxT", location: { city: "HDD", country: "server", photos: { small: "", large: "", }, }, },
    ] as Array<UserType>,
    pageSize: 50 as number,
    totalUsersCount: 1112 as number,
    currentPageNumb: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>, // array of users id what are currently receiving the server response
  };
})

test("follow success", () => {
  // userReducer()
  const newState = usersReducer(state, actionsOfUsers.follow(2));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
})

test("unfollow success", () => {
  // userReducer()
  const newState = usersReducer(state, actionsOfUsers.unFollow(0));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
})