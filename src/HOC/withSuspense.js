import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Preloader from "../components/common/Preloader/Preloader";


export const withSuspense = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      

      return <Suspense fallback={<Preloader />} ><Component {...this.props} /></Suspense>
    }
  }

  // let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

  return RedirectComponent;
}