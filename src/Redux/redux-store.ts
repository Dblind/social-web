import { applyMiddleware, combineReducers, createStore } from "redux";
import authenticationReducer from "./authentication-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authenticationReducer,
  form: formReducer,
  app: appReducer,
  // sidebarReducer
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window._store = store;

console.log("state", store.getState());

export default store;