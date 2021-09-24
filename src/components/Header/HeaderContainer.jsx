import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { setUserAuthenticationData } from "../../Redux/authentication-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {

  componentDidMount() {

    axios.get("https://social-network.samuraijs.com/api/1.0/auth/me",
      { withCredentials: true, })
      .then(response => {
        if (response.data.resultCode === 0) {
          console.log("set response")
          this.props.setUserAuthenticationData(
            response.data.data.id,
            response.data.data.email,
            response.data.data.login,
          )
        }
      })
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
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);