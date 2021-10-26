import social from './social-media-stock_tiktok.jpg';
import css from './Header.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

export type PropsTypeHeader = { isAuthorized: boolean, logout: () => void, login: string, }

const Header: React.FC<PropsTypeHeader> = function Header(props) {
  return (
    <div className={css.header}>
      <NavLink to="/home"><img className={css.header__logo} src={social} alt="logo" /></NavLink>
      <Clock />
      <div className={css.header__loginBlock}>
        {props.isAuthorized
          ?
          <span>
            <NavLink to="/profile" activeClassName={css.activeLogin} >{props.login}</NavLink>
            <button onClick={props.logout}>Logout</button>
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