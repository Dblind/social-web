import { responseCodes, ServerResponseType } from "../../api/api";
import { usersAPI } from "../../api/users-api";
import { follow, followThunckCreator, toggleFollowingProgress, toggleIsFetching, unFollow, unFollowThunkCreator } from "../users-reducer";

const serverResult: ServerResponseType = {
  data: {},
  resultCode: responseCodes.success,
  messages: [],
}

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

jest.mock('../../api/users-api');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  usersAPIMock.follow.mockClear();
  usersAPIMock.unFollow.mockClear();
})

test("thunk follow", async () => {
  // usersAPIMock.follow.mockReturnValue(serverResult);
  usersAPIMock.follow.mockReturnValue(Promise.resolve(serverResult)); 
  const thunk = followThunckCreator(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, follow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1));
})

test("thunk unfollow", async () => {
  // usersAPIMock.unFollow.mockReturnValue(serverResult);
  usersAPIMock.unFollow.mockReturnValue(Promise.resolve(serverResult)); 
  const thunk = unFollowThunkCreator(1);
  
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, unFollow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1));
})