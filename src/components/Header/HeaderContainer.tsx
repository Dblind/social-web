import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import { authenticationMe, logout, setUserAuthenticationData } from "../../Redux/authentication-reducer";
import { AppStateType } from "../../Redux/redux-store";
import Header, { PropsTypeHeader } from "./Header";

class HeaderContainer extends React.Component<PropsTypeHeader> {

  render() {
    return (
      <Header {...this.props} />
    )
  }
}

function mapStateToProps(state: AppStateType) {
  return {
    isAuthorized: state.auth.isAuthorized,
    login: state.auth.login,
  }
}
const mapDispatchToProps = {
  setUserAuthenticationData,
  logout,
}

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))(HeaderContainer);