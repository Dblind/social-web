import React from "react";
import css from './Login.module.css';
import LoginForm from "./LoginForm";

const Login = (props) => {

  function onSubmit(formData) {
    console.log("form data", formData);
  }

  return (
    <div className={css.login}>
      <h1>Login.</h1>
      <LoginForm onSubmit={onSubmit}/>
    </div>
  )
}

export default Login;