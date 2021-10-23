import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { login } from "../../Redux/authentication-reducer";
import { AppStateType } from "../../Redux/redux-store";
import css from './Login.module.css';
import LoginForm from "./LoginForm";


type MapStateToProps = {
  captchaUrl: string | null,
  isAuth: boolean,
}
type MapDispatchToProps = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void,
}

export type LoginFormData = {
  email: string, password: string, rememberMe: boolean, captcha: string | null,
}

const Login: React.FC<MapStateToProps & MapDispatchToProps> = (props) => {

  function onSubmit(formData: LoginFormData) {
    console.log("form data", formData);
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  }

  if (props.isAuth) return <Redirect to={"/profile"} />

  return (

    <div className={css.login}>
      <p>oppruetor@mail.ru</p>
      <p>K4sNsqHijQZjPqR</p>
      <h1>Login.</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  )
}

const mapStateToProps = (state: AppStateType): MapStateToProps => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuthorized,
})

export default connect(mapStateToProps, { login })(Login);