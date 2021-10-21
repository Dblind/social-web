import { authenticationMe } from "./authentication-reducer";
import { loggedAction } from "./logers/loger-reducers";

export type Initial = {
  initialized: Boolean,
  globalError?: string,
}

let initial: Initial = {
  initialized: false,
}

const appReducer = (state: Initial = initial, action: any): Initial => {
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

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

export type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS,
  initialized: Boolean,
}
export function initializedSuccess(): InitializedSuccessActionType { return { type: INITIALIZED_SUCCESS, initialized: true,} };

export function initializeApp() {
  return (dispatch: any) => {
    let promiseResponseFromMe = dispatch(authenticationMe());
    Promise.all([promiseResponseFromMe])
      .then(() => dispatch(initializedSuccess()));

  }
}
export default appReducer;