import social from './social-media-stock_tiktok.jpg';
import css from './Header.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from '../../Redux/selectors/auth-selectors';
import { logout } from '../../Redux/authentication-reducer';

export type PropsTypeHeader = { isAuthorized: boolean, logout: () => void, login: string, }

// const Header: React.FC<PropsTypeHeader> = function Header(props) {
  const Header: React.FC = function Header(props) {
  const isAuthorized = useSelector(authSelectors.selectIsAuth);
  const login = useSelector(authSelectors.selectCurrentUserLogin);

  const dispatch = useDispatch();

  const logoutCallback = () => { dispatch(logout); };

  return (
    <div className={css.header}>
      <Clock />
      <NavLink to="/home"><img className={css.header__logo} src={social} alt="logo" /></NavLink>
      <div className={css.header__loginBlock}>
        {isAuthorized
          ?
          <span>
            <NavLink to="/profile" activeClassName={css.activeLogin} >{login}</NavLink>
            <button onClick={logoutCallback}>Logout</button>
          </span>
          : <NavLink to="/login" >Login</NavLink>}
      </div>
    </div>


  )
}

// import { Timer } from 'NodeJS';
type PropsTypeClock = { }

class Clock extends React.Component<PropsTypeClock> {
  state: { date: Date, timerInterval: NodeJS.Timeout | null, };
    // ((callbak:() => void, time?: number | undefined) => NodeJS.Timer) | null, };

  constructor(props: PropsTypeClock) {

    super(props);
    this.state = {
      date: new Date(),
      timerInterval: null,
    }
  }

  componentDidMount() {
    
    this.state.timerInterval = setInterval(this.tick.bind(this), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.state.timerInterval as NodeJS.Timeout);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    return (
      <div className={css.header__clock}><span>Clock: </span>{this.state.date.toLocaleTimeString()}</div>
    )
  }
}

export default Header;