import { authenticationMe } from "./authentication-reducer";
import { loggedAction } from "./logers/loger-reducers";
import { InferActionTypes } from "./redux-store";


let initial = {
  initialized: false,
}
export type Initial = typeof initial;

const appReducer = (state = initial, action: ActionTypes): Initial => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: action.initialized,
      }
    }
    default: {
      loggedAction(action.type, "appReducer", false);      
      return state;
    }
  }
}

const INITIALIZED_SUCCESS = "sn/app/INITIALIZED-SUCCESS";

export const actionsApp = {
  initializedSuccess,
}
type ActionTypes = InferActionTypes<typeof actionsApp>;

export type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS,
  initialized: boolean,
}

export function initializedSuccess(): InitializedSuccessActionType { return { type: INITIALIZED_SUCCESS, initialized: true,} as const };

export function initializeApp() {
  return (dispatch: any) => {
    let promiseResponseFromMe = dispatch(authenticationMe());
    Promise.all([promiseResponseFromMe])
      .then(() => dispatch(initializedSuccess()));

  }
}
export default appReducer;