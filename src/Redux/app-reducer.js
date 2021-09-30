import { authenticationMe } from "./authentication-reducer";

let initial = {
  initialized: false,
}

const appReducer = (state = initial, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: action.initialized,
      }
    }
    default: {
      console.log("TODO: default case for reducers.")
      return state;
    }
  }
}

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

export function initializedSuccess() { return { type: INITIALIZED_SUCCESS, initialized: true,} };

export function initializeApp() {
  return (dispatch) => {
    let promiseResponseFromMe = dispatch(authenticationMe);
    Promise.all([promiseResponseFromMe])
      .then(() => dispatch(initializedSuccess()));

  }
}
export default appReducer;