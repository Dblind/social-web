import social from './social-media-stock_tiktok.jpg';
import css from './Header.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <div className={css.header}>
      <NavLink to="/home"><img className={css.header__logo} src={social} alt="logo" /></NavLink>
      <Clock />
      <div className={css.header__loginBlock}>
        {props.isAuthorized
          ? <NavLink to="/profile" activeClassName={css.activeLogin} >{props.login}</NavLink>
          : <NavLink to="/login" >Login</NavLink> }
      </div>
    </div>


  )
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    }
  }

  componentDidMount() {
    this.timerInterval = setInterval(this.tick.bind(this), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
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