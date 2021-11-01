import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import authenticationReducer from "./authentication-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";
import { ProfileType } from "../types/types";
import chatReducer from "./chat-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authenticationReducer,
  form: formReducer,
  app: appReducer,
  // sidebarReducer
  chat: chatReducer,
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

// type PropertyTypes<T> = T extends { [key: string]: infer U } ? U : never;
// export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertyTypes<T>>
    // short variant
export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;

export type BaseThunkType<A extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, A>;


let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window._store = store;

console.log("state", store.getState());

export default store;