import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { login } from "../../Redux/authentication-reducer";
import { AppStateType } from "../../Redux/redux-store";
import css from './Login.module.css';
import LoginForm from "./LoginForm";


export type LoginFormData = {
  email: string, password: string, rememberMe: boolean, captcha: string | null,
}

const Login: React.FC = (props) => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuthorized);

  const dispatch = useDispatch();

  function onSubmit(formData: LoginFormData) {
    // console.log("form data", formData);
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
  }

  if (isAuth) return <Redirect to={"/profile"} />

  return (

    <div className={css.login}>
      <p>oppruetor@mail.ru</p>
      <p>K4sNsqHijQZjPqR</p>
      <h1>Login.</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  )
}

export default Login;