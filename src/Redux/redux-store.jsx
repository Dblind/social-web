import { applyMiddleware, combineReducers, createStore } from "redux";
import authenticationReducer from "./authentication-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authenticationReducer,
  // sidebarReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

console.log("reducers", reducers);
 
export default store;