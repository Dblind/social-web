import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLength, minLength, required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { LoginFormData } from "./Login";
import css from './Login.module.css';

const maxLength30 = maxLength(30);
const minLength3 = minLength(3);

type LoginFormDataOwn = {
  captchaUrl: string | null,
}
const LoginForm: React.FC<InjectedFormProps<LoginFormData, LoginFormDataOwn> & LoginFormDataOwn> = ({handleSubmit, error, captchaUrl}) => {
  return (
    <div className={css.login__form}>
      <form onSubmit={handleSubmit}>
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
          {error && <div className={css.login__summaryReport}> {error} </div>}
          <li><button>submit button</button></li>
        </ul>
        {captchaUrl && <img src={captchaUrl} alt="captcha" />}
        {captchaUrl &&
          <Field component={Input} placeholder="captcha" name="captcha"
            validate={[required]} />}
      </form>
    </div>
  )
}

const LoginReduxForm = reduxForm<LoginFormData, LoginFormDataOwn>({
  form: "login",
})(LoginForm);

export default LoginReduxForm;