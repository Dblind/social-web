import React from "react";
import { Field, reduxForm } from "redux-form";
import css from './Login.module.css';

const LoginForm = (props) => {
  return (
    <div className={css.login__form}>
      <form onSubmit={props.handleSubmit}>
        <ul>
          <li><Field component={"input"} name="login" type="text" placeholder="login" /></li>
          <li><Field component={"input"} name="password" type="text" placeholder="password" /></li>
          <li><label><Field component={"input"} name="rememberMe" type="checkbox"  />remeber</label></li>
          {/* <li><input type="submit" value="submit input" /></li> */}
          <li><button>submit button</button></li>
        </ul>
      </form>
    </div>
  )
}

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

export default LoginReduxForm;