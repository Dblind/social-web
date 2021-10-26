import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { AppStateType } from "../Redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuthorized,
  }
}

type StatePropsType = { isAuth: boolean, };

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<StatePropsType> = (props) => {
    let { isAuth, ...restProps } = props;

    if (!props.isAuth) return <Redirect to="/login" />

    return <WrappedComponent {...restProps as WCP} />
  }


  // let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
  let ConnectedAuthRedirectComponent
    = connect<StatePropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}