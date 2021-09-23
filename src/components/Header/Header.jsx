import social from './social-media-stock_tiktok.jpg';
import css from './Header.module.css';
import React from 'react';

function Header(props) {
  return (
    <div className={css.header}>
      <img className={css.logo} src={social} alt="logo" />
      <Clock />
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
      <div className={css.clock}><span>Clock: </span>{this.state.date.toLocaleTimeString()}</div>
    )
  }
}

export default Header;