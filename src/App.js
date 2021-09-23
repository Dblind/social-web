import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { BrowserRouter, Route } from 'react-router-dom';
import News from './components/News/News';
import Users from './components/Users/Users';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
// import state from './Redux/State';

// https://social-network.samuraijs.com/

function App(props) {
  // let state = props.state;
  // console.log("state", state);
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="content">
          <Route path="/" />            
          <Route path="/dialogs" render={() => <DialogsContainer />} />
          <Route path="/profile" render={() => <ProfileContainer />} />
          <Route path="/news" component={News} />
          <Route path="/users" component={() => <UsersContainer />}/>
        </div>
      </div>
    </BrowserRouter>
  );
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

export default App;
