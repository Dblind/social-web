import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { BrowserRouter, Route } from 'react-router-dom';
import News from './components/News/News';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { authenticationMe } from './Redux/authentication-reducer';
import { initializeApp } from './Redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import Tests from './components/Tests/Tests';

import store from './Redux/redux-store';    // redux
import { Provider } from 'react-redux';     // react-redux context
import { compose } from 'redux';
import { withRouter } from 'react-router';

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
*/



// https://social-network.samuraijs.com/
// https://social-network.samuraijs.com/api/1.0/

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) return <Preloader />;

    return (
      // <BrowserRouter>
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="content">
            <Route exact path="/" component={() => <Tests />}/>
            <Route path="/dialogs" render={() => <DialogsContainer />} />

            {/* index.js => App => <BrowseRouter/> <Route /profile/:userId? > => connect()() => withRoute() => ContainerProfile => Profile */}
            <Route path="/profile/:userId?" /*параметр userId*/ render={() => <ProfileContainer />} />

            <Route path="/login" render={() => <Login />} />
            <Route path="/news" component={News} />
            <Route path="/users" component={() => <UsersContainer />} />
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

function mapStateToProps(state) {
  return {
    initialized: state.app.initialized,
  }
}

let A = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);

let B = (props) => {
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