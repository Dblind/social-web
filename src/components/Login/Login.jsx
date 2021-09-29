import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { login } from "../../Redux/authentication-reducer";
import css from './Login.module.css';
import LoginForm from "./LoginForm";

const Login = (props) => {

  function onSubmit(formData) {
    console.log("form data", formData);
    props.login(formData.email, formData.password, formData.rememberMe);
  }

  if (props.isAuth) return <Redirect to={"/profile"} />

  return (

    <div className={css.login}>
      <p>oppruetor@mail.ru</p>
      <p>K4sNsqHijQZjPqR</p>
      <h1>Login.</h1>
      <LoginForm onSubmit={onSubmit} />
    </div>
  )
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthorized,
})

export default connect(mapStateToProps, { login })(Login);