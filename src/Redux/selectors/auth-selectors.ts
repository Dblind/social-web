import { createSelector } from "reselect"
import { AppStateType } from "../redux-store"


const selectIsAuth = (state: AppStateType) => { return state.auth.isAuthorized; };
const selectCurrentUserLogin = (state: AppStateType) => { return state.auth.login; };

const authSelectors = {
  selectIsAuth,
  selectCurrentUserLogin,
};
export default  authSelectors;