import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { authenticationMe, logout, setUserAuthenticationData } from "../../Redux/authentication-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {

  componentDidMount() {
    this.props.authenticationMe();
  }

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
  authenticationMe,
  logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);