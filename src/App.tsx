import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticationMe } from './Redux/authentication-reducer';
import { initializeApp } from './Redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';

import store, { AppStateType } from './Redux/redux-store';    // redux
import { Provider } from 'react-redux';     // react-redux context
import { compose } from 'redux';
import { Redirect, Switch, withRouter } from 'react-router';

import HeaderContainer from './components/Header/HeaderContainer';
import News from './components/News/News';
import UsersContainer, { UsersPage } from './components/Users/UsersContainer';
import Tests from './components/Tests/Tests';

import Navbar from './components/Navbar/Navbar';
import { withSuspense } from './HOC/withSuspense';
// import ProfileContainer from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
// import Login from './components/Login/Login';
const Login = React.lazy(() => import('./components/Login/Login'));
/*
authentication data {
  login: RegAuthentication,
  email: regauth@dog.cat,
  password: CvBdfg5jezCVYQh,
}

authentication data {
  login: RegAuthenticationAut,
  email: oppruetor@mail.ru,
  password: K4sNsqHijQZjPqR,
  id: 19834,
  API_KEY: d0d8fea3-e35d-4a5d-8b18-bc86cf9e55b5,
}

mapStateToProps.
К примеру:  getProfile: state.blablabla
Решилось так: getProfile: ()=> state.blablabla
*/



// https://social-network.samuraijs.com/
// https://social-network.samuraijs.com/api/1.0/

type StatePropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = { initializeApp: () => void, };

class App extends React.Component<StatePropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
    console.log("Some error occured");
    console.error(PromiseRejectionEvent);
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) return <Preloader />;

    return (
      // <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="content">    {/* render: for the function component, component: for the class component. */}
          <Switch>
            <Route path="/dialogs" component={() => { const C = withSuspense(DialogsContainer); return <C /> }} />

            {/* index.js => App => <BrowseRouter/> <Route /profile/:userId? > => connect()() => withRoute() => ContainerProfile => Profile */}
            <Route path="/profile/:userId?" /*параметр userId*/
              // render={() => <Suspense fallback={<Preloader />}><ProfileContainer /></Suspense>} />
              render={() => { const Temp = withSuspense(ProfileContainer); return <Temp /> }} />

            <Route path="/login" component={withSuspense(Login)} />
            <Route path="/news" component={News} />
            <Route path="/users" component={() => <UsersPage
             pageTitle="Page title test!"           // ????????????
            />} />

            <Route path="/home" component={() => <Tests />} />

            <Route exact path="/" render={() => <Redirect to="/profile" />} />

            <Route path="*" component={() => <div style={{ color: "#d33", }}><strong>ERROR 404: page not found!</strong></div>} />
          </Switch>
        </div>
      </div>
      // </BrowserRouter>
    );
  }
}




// http-request type: get / post / put / delete / patch
// http codes: 404 - not found, 5xx - server errors, 3xx - redirect, 2xx - OK
// axios axios.get("https//").then( func ). then( func );





/*
<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
*/

function mapStateToProps(state: AppStateType) {
  return {
    initialized: state.app.initialized,
  }
}

let A = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

let B: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <React.StrictMode>
          <A />
        </React.StrictMode>
      </Provider>
    </BrowserRouter>
  )
}
export default B;