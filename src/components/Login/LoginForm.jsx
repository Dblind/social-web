import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLength, minLength, required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import css from './Login.module.css';

const maxLength30 = maxLength(30);
const minLength3 = minLength(3);
const LoginForm = (props) => {
  return (
    <div className={css.login__form}>
      <form onSubmit={props.handleSubmit}>
        <ul>
          <li><Field component={Input} placeholder="login" 
            validate={[required, maxLength30, minLength3,]}
            name="email" type="text" /></li>
          <li><Field component={Input} placeholder="password" 
            validate={[required, maxLength30, minLength3,]}
            name="password" type="text" /></li>
          <li><label><Field component={Input}
            name="rememberMe" type="checkbox" />remeber</label></li>
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