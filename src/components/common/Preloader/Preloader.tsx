import React from "react"

import preloader from '../../Users/1487.gif';
import css from '../../Users/Users.module.css';

const Preloader: React.FC = function Preloader(props) {
  return (
    <div ><img className={css.preloader} src={preloader}></img></div>
  )
}

export default Preloader;