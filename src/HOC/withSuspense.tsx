import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Preloader from "../components/common/Preloader/Preloader";


export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  /*
  class RedirectComponent extends React.Component {
    render(props: WCP) {


      return <Suspense fallback={<Preloader />} >
        <WrappedComponent {...this.props} />
      </Suspense>
    }
  }
  */

  // let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

  // return RedirectComponent;

  return (props: WCP) => {
    return <Suspense fallback={<Preloader />}>
      <WrappedComponent {...props} />
    </Suspense>
  }
}