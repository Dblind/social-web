import { Route, BrowserRouter, NavLink } from 'react-router-dom';
import Dialogs from '../Dialogs/Dialogs';
import Profile from '../Profile/Profile.jsx';
import Friends from './Friends/Friends';
import css from './Navbar.module.css';

function Navbar(props) {
  // debugger;
  return (
      <div className={css.conteinerNav}>
        <nav className={css.nav}>
          <ul>
            <li className="item"><NavLink activeClassName={css.activeLink} to="/">Home</NavLink></li>
            <li className="item"><NavLink activeClassName={css.activeLink} to="/profile">Profile</NavLink></li>
            <li className="item"><NavLink activeClassName={css.activeLink} to="/dialogs">Messages</NavLink></li>
            <li className="item"><NavLink activeClassName={css.activeLink} to="/news">News</NavLink></li>
            <li className="item"><NavLink activeClassName={css.activeLink} to="/music">Music</NavLink></li>
            <li className="item"><NavLink activeClassName={css.activeLink} to="/setting">Setting</NavLink></li>
            <li className="item"><NavLink activeClassName={css.activeLink} to="/users">Users</NavLink></li>
          </ul>
          {/* <Friends friends={props.friends} /> */}
        </nav>
      </div>
  )
}

export default Navbar;