import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import { authenticationMe, logout, setUserAuthenticationData } from "../../Redux/authentication-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {

  render() {
    return (
      <Header {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthorized: state.auth.isAuthorized,
    login: state.auth.login,
  }
}
const mapDispatchToProps = {
  setUserAuthenticationData,
  logout,
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))(HeaderContainer);